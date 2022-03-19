import json

from django.http.response import JsonResponse
from grocapital.settings import FRESHBOOKS_CLIENT_ID, FRESHBOOKS_CLIENT_SECRET, FRESHBOOKS_REDIRECT_URI, FRESHBOOKS_MIDDLEWARE
from django.shortcuts import render, redirect
from django.http import HttpResponseBadRequest
from freshbooks import Client
import requests
import datetime


def index(request):
    return render(request, 'index_freshbooks.html')


def oauth(request,profile_id):
    freshBooksClient = Client(
        client_id=FRESHBOOKS_CLIENT_ID,
        client_secret=FRESHBOOKS_CLIENT_SECRET,
        redirect_uri=FRESHBOOKS_REDIRECT_URI,
    )

    url = freshBooksClient.get_auth_request_url()

    return redirect(url)


def callback(request):
    freshBooksClient = Client(
        client_id=FRESHBOOKS_CLIENT_ID,
        client_secret=FRESHBOOKS_CLIENT_SECRET,
        redirect_uri=FRESHBOOKS_REDIRECT_URI
    )

    access_grant_code = request.GET.get('code', None)


    if access_grant_code is None:
        return HttpResponseBadRequest()

    auth_results = freshBooksClient.get_access_token(access_grant_code)

    # try:
    request.session['access_token'] = auth_results.access_token


    # request.session['refresh_token'] = auth_results.refresh_token

    # record_profit(request)
    # except Exception as e:

    return redirect(connected)


def connected(request):
    access_token = request.session.get('access_token', None)

    freshBooksClient = Client(
        client_id=FRESHBOOKS_CLIENT_ID,
        access_token=access_token,
    )

    for i in range(len(freshBooksClient.current_user.business_memberships)):
        account_id = freshBooksClient.current_user.business_memberships[i]['business']['account_id']

        route = f'https://api.freshbooks.com/accounting/account/{account_id}/reports/accounting/profitloss_entity?start_date=2017-01-01'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/json'
        }

        response = requests.get(route, headers=headers)
        response = response.json()

        # try:
        profit_loss = response['response']['result']['profitloss']

        try:
            company_name = profit_loss['company_name']
            if(company_name == ''):
                company_name = 'Not Available'
        except:
            company_name = 'null'
        try:
            currency_code = profit_loss['currency_code']
        except:
            currency_code = 'null'
        try:
            end_date = profit_loss['end_date']
        except:
            end_date = 'null'
        try:
            total_expenses = profit_loss['total_expenses']['total']['amount']
        except:
            total_expenses = 'null'
        try:
            total_income = profit_loss['total_income']['total']['amount']
        except:
            total_income = 'null'


        context = {
            'base_url' : FRESHBOOKS_MIDDLEWARE,
            'company_name': company_name,
            'currency_code': currency_code, 
            'end_date': end_date, 
            'total_expenses': total_expenses, 
            'total_income': total_income,
            'gross_profit_ytd': total_income,
            "net_profit_ytd": profit_loss['net_profit']['total']['amount'],
        }


        get_response = get_profit(request,2,1)

        context['gross_profit_1'] = get_response['gross_profit']
        context['net_profit_1'] = get_response['net_profit_py']
        context['cogs_1'] = get_response['cogs']
        
        get_response = get_profit(request,3,1)

        context['gross_profit_2'] = get_response['gross_profit']
        context['net_profit_2'] = get_response['net_profit_py']
        context['cogs_2'] = get_response['cogs']

        get_response = get_profit(request,4,1)

        context['gross_profit_3'] = get_response['gross_profit']
        context['net_profit_3'] = get_response['net_profit_py']
        context['cogs_3'] = get_response['cogs']

        print(context)

        return render(request, 'connected_freshbooks.html', {'context':context})
        
        # except Exception as e:
        #     continue
        

    return render(request, 'popupClose.html', context={})


# expenses = []
# for expense in profit_loss['expenses']:
#     expenses.append({'amount': expense['total']['amount'],
#                     'description': expense['description'], 'entry_type': expense['entry_type']})

def get_profit(request,start_date,end_date):
    access_token = request.session.get('access_token', None)

    freshBooksClient = Client(
        client_id=FRESHBOOKS_CLIENT_ID,
        access_token=access_token,
    )
    context = {}
    for i in range(len(freshBooksClient.current_user.business_memberships)):
        now = datetime.datetime.now()
        account_id = freshBooksClient.current_user.business_memberships[i]['business']['account_id']
        base_url = f'https://api.freshbooks.com/accounting/account/{account_id}/reports/accounting/profitloss_entity?start_date={now.year-start_date}-01-01&end_date={now.year-end_date}-12-31'
        

        headers = {
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/json'
        }

        response = requests.get(base_url, headers=headers)
        response = response.json()


        profit_loss = response['response']['result']['profitloss']


        income = profit_loss['income']
        cogs = ""
        for i in income:
            if i['description'].lower() == 'cost of goods sold':
                cogs= i['total']['amount']

        context = {
            "gross_profit":profit_loss['total_income']['total']['amount'],
            "net_profit_py":profit_loss['net_profit']['total']['amount'],
            "cogs":cogs
        }

    return context
