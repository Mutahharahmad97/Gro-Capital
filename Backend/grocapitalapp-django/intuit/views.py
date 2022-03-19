from grocapital.settings import CLIENT_ID, ENVIRONMENT, CLIENT_SECRET, REDIRECT_URI, QUICKBOOKS_MIDDLEWARE
import json
import requests

from intuitlib.client import AuthClient
from intuitlib.migration import migrate
from intuitlib.enums import Scopes
from intuitlib.exceptions import AuthClientError

from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseBadRequest
from django.conf import settings
from .services import balanceSheet,ProfitAndLoss


def index(request):
    return render(request, 'index_intuit.html')


def oauth(request):
    auth_client = AuthClient(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        ENVIRONMENT
    )
    
    print(CLIENT_ID)
    url = auth_client.get_authorization_url([Scopes.ACCOUNTING])
    request.session['state'] = auth_client.state_token
    return redirect(url)


def callback(request):
    auth_client = AuthClient(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        ENVIRONMENT,
        state_token=request.session.get('state', None),
    )

    state_tok = request.GET.get('state', None)
    error = request.GET.get('error', None)

    if error == 'access_denied':
        return render(request, 'popupClose.html')

    if state_tok is None:
        return HttpResponseBadRequest()
    elif state_tok != auth_client.state_token:
        return HttpResponse('unauthorized', status=401)

    auth_code = request.GET.get('code', None)
    realm_id = request.GET.get('realmId', None)
    request.session['realm_id'] = realm_id

    if auth_code is None:
        return HttpResponseBadRequest()

    try:
        auth_client.get_bearer_token(auth_code, realm_id=realm_id)
        request.session['access_token'] = auth_client.access_token
        request.session['refresh_token'] = auth_client.refresh_token
        request.session['id_token'] = auth_client.id_token
    except AuthClientError as e:
        # just printing status_code here but it can be used for retry workflows, etc
        print(e.status_code)
        print(e.content)
        print(e.intuit_tid)
    except Exception as e:
        print(e)
    return redirect(connected)


def connected(request): 
    auth_client = AuthClient(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        ENVIRONMENT,
        access_token=request.session.get('access_token', None),
        refresh_token=request.session.get('refresh_token', None),
        realm_id=request.session.get('realm_id', None),
    )

    if auth_client.access_token is not None:
        access_token = auth_client.access_token

    if auth_client.realm_id is None:
        raise ValueError('Realm id not specified.')
    
    # try:
    # Balance Sheet API
    response = balanceSheet(auth_client.access_token, auth_client.realm_id)
    response = response.text
    response = json.loads(response)

    print(f"Balance Sheet API start \n{response} \n Balance Sheet API ends...........")
    
    '''
        + Total_Bank_Accounts
        + Total_Other_Current_Assets
        + Total_Current_Assets
        + Total_Fixed_Assets
        + Total_Assets
        + Accounts_Payable_(A/P)
        + Total_Accounts_Payable
        + Total_Other_Current_Liabilities
        + Total_Current_Liabilities
        + Total_Long_Term_Liabilities
        + Total_Liabilities
        - Retained_Earnings (might fluctuate too)
        - Net_Income (might fluctuate too)
        + Total_Equity
        + Total_Liabilities_And_Equity
    '''
    # Assets
    first_row = response['Rows']['Row'][0]
    first_first_row = first_row['Rows']['Row'][0]
    first_second_row = first_row['Rows']['Row'][1]

    try:
        total_bank_accounts = first_first_row['Rows']['Row'][0]['Summary']['ColData'][1]['value']
    except:
        total_bank_accounts = 'null'
    try:
        total_other_current_assets = first_first_row['Rows']['Row'][2]['Summary']['ColData'][1]['value']
    except:
        total_other_current_assets =  'null'
    try:
        total_current_assets = first_first_row['Summary']['ColData'][1]['value']
    except:
        total_current_assets =  'null'
    try:
        total_fixed_assets = first_second_row['Summary']['ColData'][1]['value']  
    except:
        total_fixed_assets =  'null'
    try:
        total_assets = first_row['Summary']['ColData'][1]['value']  
    except:
        total_assets =  'null'

    try:
        accounts_recieveable = first_first_row['Rows']['Row'][1]['Rows']['Row'][0]['ColData'][1]['value']
    except:
        accounts_recieveable = 'null'
    
    try:
        total_accounts_recieveable = first_first_row['Rows']['Row'][1]['Summary']['ColData'][1]['value']
    except:
        total_accounts_recieveable = 'null'
    
    
    #Liabilities And Equity
    
    second_row = response['Rows']['Row'][1]
    second_first_row = second_row['Rows']['Row'][0]
    second_second_row = second_row['Rows']['Row'][1]
    
    try:
        accounts_payable = second_first_row['Rows']['Row'][0]['Rows']['Row'][0]['Rows']['Row'][0]['ColData'][1]['value']  
    except:
        accounts_payable =  'null'
        
    try:
        total_accounts_payable = second_first_row['Rows']['Row'][0]['Rows']['Row'][0]['Summary']['ColData'][1]['value']  
    except:
        total_accounts_payable =  'null'

    try:
        total_other_current_liabilities = second_first_row['Rows']['Row'][0]['Rows']['Row'][2]['Summary']['ColData'][1]['value']  
    except:
        total_other_current_liabilities =  'null'
    try:
        total_current_liabilities = second_first_row['Rows']['Row'][0]['Summary']['ColData'][1]['value']  
    except:
        total_current_liabilities =  'null'
    try:
        total_long_term_liabilities = second_first_row['Rows']['Row'][1]['Summary']['ColData'][1]['value']  
    except:
        total_long_term_liabilities =  'null'
    try:
        total_liabilities = second_first_row['Summary']['ColData'][1]['value']  
    except:
        total_liabilities =  'null'
    try:
        total_equity = second_second_row['Summary']['ColData'][1]['value']  
    except:
        total_equity =  'null'
    try:
        total_liabilities_and_equity = second_row['Summary']['ColData'][1]['value']  
    except:
        total_liabilities_and_equity =  'null'
        
    # except Exception as e:
    #     print(e)
    #     print('QuickBooks API Error')
    

    return render(request, 'connected_intuit.html', context={'base_url' : QUICKBOOKS_MIDDLEWARE ,'total_bank_accounts': total_bank_accounts, 'total_other_current_assets': total_other_current_assets, 'total_current_assets': total_current_assets,
                                     'total_fixed_assets': total_fixed_assets, 'total_assets': total_assets, 'accounts_payable': accounts_payable, 'total_accounts_payable': total_accounts_payable,
                                     'total_other_current_liabilities': total_other_current_liabilities, 'total_current_liabilities': total_current_liabilities, 'total_long_term_liabilities': total_long_term_liabilities,
                                     'total_liabilities': total_liabilities, 'total_equity': total_equity, 'total_liabilities_and_equity': total_liabilities_and_equity,'accounts_recieveable': accounts_recieveable})








def qbo_request(request):
    auth_client = AuthClient(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI,
        ENVIRONMENT,
        access_token=request.session.get('access_token', None),
        refresh_token=request.session.get('refresh_token', None),
        realm_id=request.session.get('realm_id', None),
    )

    if auth_client.access_token is not None:
        access_token = auth_client.access_token

    if auth_client.realm_id is None:
        raise ValueError('Realm id not specified.')
    
    try:
        # Balance Sheet API
        response = balanceSheet(auth_client.access_token, auth_client.realm_id)
        response = response.text
        response = json.loads(response)
        
        '''
            + Total_Bank_Accounts
            + Total_Other_Current_Assets
            + Total_Current_Assets
            + Total_Fixed_Assets
            + Total_Assets
            + Accounts_Payable_(A/P)
            + Total_Accounts_Payable
            + Total_Other_Current_Liabilities
            + Total_Current_Liabilities
            + Total_Long_Term_Liabilities
            + Total_Liabilities
            - Retained_Earnings (might fluctuate too)
            - Net_Income (might fluctuate too)
            + Total_Equity
            + Total_Liabilities_And_Equity
        '''
        # Assets
        first_row = response['Rows']['Row'][0]
        first_first_row = first_row['Rows']['Row'][0]
        first_second_row = first_row['Rows']['Row'][1]
        
        total_bank_accounts = first_first_row['Rows']['Row'][0]['Summary']['ColData'][1]['value']  
        total_other_current_assets = first_first_row['Rows']['Row'][2]['Summary']['ColData'][1]['value']  
        total_current_assets = first_first_row['Summary']['ColData'][1]['value']  
        
        total_fixed_assets = first_second_row['Summary']['ColData'][1]['value']  
        total_assets = first_row['Summary']['ColData'][1]['value']  
        
        #Liabilities And Equity
        second_row = response['Rows']['Row'][1]
        second_first_row = second_row['Rows']['Row'][0]
        second_second_row = second_row['Rows']['Row'][1]
        
        accounts_payable = second_first_row['Rows']['Row'][0]['Rows']['Row'][0]['Rows']['Row'][0]['ColData'][1]['value']  
        total_accounts_payable = second_first_row['Rows']['Row'][0]['Rows']['Row'][0]['Summary']['ColData'][1]['value']  
        total_other_current_liabilities = second_first_row['Rows']['Row'][0]['Rows']['Row'][2]['Summary']['ColData'][1]['value']  
        total_current_liabilities = second_first_row['Rows']['Row'][0]['Summary']['ColData'][1]['value']  
        total_long_term_liabilities = second_first_row['Rows']['Row'][1]['Summary']['ColData'][1]['value']  
        total_liabilities = second_first_row['Summary']['ColData'][1]['value']  
        total_equity = second_second_row['Summary']['ColData'][1]['value']  
        total_liabilities_and_equity = second_row['Summary']['ColData'][1]['value']  
        
    except Exception as e:
        print(e)
        print('QuickBooks API Error')

    return HttpResponse('OK')
