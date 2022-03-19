import requests
from grocapital.settings import EXPERIAN_USERNAME, EXPERIAN_PASSWORD, EXPERIAN_CLIENT_ID, EXPERIAN_CLIENT_SECRET


def get_access_token():
    access_token_url = 'https://sandbox-us-api.experian.com/oauth2/v1/token'
    access_token = requests.post(access_token_url,
                                 headers={"Content-Type": "application/json",
                                          "Accept": "application/json", "Grant_type": "password"},
                                 json={
                                     "username": EXPERIAN_USERNAME,
                                     "password": EXPERIAN_PASSWORD,
                                     "client_id": EXPERIAN_CLIENT_ID,
                                     "client_secret": EXPERIAN_CLIENT_SECRET,
                                 }
                                 )

    access_token = access_token.json()
    access_token = access_token['access_token']
    return access_token


def get_experian_score(access_token, duns):
    experian_score_url = 'https://sandbox-us-api.experian.com/eits/gdp/v1/request?targeturl=https://sandbox-us-api.experian.com/businessinformation/businesses/v1/scores'
    score = requests.post(experian_score_url,
                          headers={"Content-Type": "application/json", "clientReferenceId": "SBMYSQL",
                                   "Authorization": f"Bearer {access_token}"},
                          json={
                              "bin": duns,
                              "subcode": "0517614",
                              "modelCode": "000224",
                              "fsrScore": True,
                              "commercialScore": True,
                          }
                          )
    return score.json()


def get_credit_score(access_token):
    experian_credit_score_url = 'https://sandbox-us-api.experian.com/eits/gdp/v1/request?targeturl=https://sandbox-us-api.experian.com/consumerservices/credit-profile/v2/credit-report'
    credit_score = requests.post(experian_credit_score_url,
                                 headers={"Content-Type": "application/json",
                                          "Authorization": f"Bearer {access_token}"},
                                 json={}
                                 )
    return credit_score.json()


def get_business_score(access_token):
    business_score_url = 'https://sandbox-us-api.experian.com/eits/gdp/v1/request?targeturl=https://sandbox-us-api.experian.com/businessinformation/businesses/v1/scores/search'
    business_score = requests.post(business_score_url,
                                   headers={"Content-Type": "application/json",
                                            "Authorization": f"Bearer {access_token}"},
                                   json={}
                                   )
    return business_score.json()
