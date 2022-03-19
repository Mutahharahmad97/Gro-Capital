import requests
from django.conf import settings
import datetime

def qbo_api_call(access_token, realm_id):
    """[summary]

    """

    if settings.ENVIRONMENT == 'production':
        base_url = settings.QBO_BASE_PROD
    else:
        base_url = settings.QBO_BASE_SANDBOX

    route = '/v3/company/{0}/companyinfo/{0}'.format(realm_id)
    auth_header = 'Bearer {0}'.format(access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    return requests.get('{0}{1}'.format(base_url, route), headers=headers)


def balanceSheet(access_token, realm_id):
    if settings.ENVIRONMENT == 'production':
        base_url = settings.QBO_BASE_PROD
    else:
        base_url = settings.QBO_BASE_SANDBOX

    route = '/v3/company/{0}/reports/BalanceSheet?minorversion=57'.format(
        realm_id)
    auth_header = 'Bearer {0}'.format(access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    return requests.get('{0}{1}'.format(base_url, route), headers=headers)

def ProfitAndLoss(access_token, realm_id):
    if settings.ENVIRONMENT == 'production':
        base_url = settings.QBO_BASE_PROD
    else:
        base_url = settings.QBO_BASE_SANDBOX

    now = datetime.datetime.now()
    start_date = f'{now.year-1}-01-01'
    end_date = f'{now.year}-01-01'
    route = f'/v3/company/{0}/reports/ProfitAndLossDetail?start_date=f{start_date}&end_date={end_date}&minorversion=57'.format(
        realm_id)
    auth_header = 'Bearer {0}'.format(access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    return requests.get('{0}{1}'.format(base_url, route), headers=headers)
