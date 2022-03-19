import xmltodict
import requests
from .payloads import consumer_credit_score_payload_new, consumer_credit_score_payload_retrieve, business_credit_score_payload_new, business_credit_score_payload_retrieve
from django.conf import settings

# Consumer Credit Score
def get_consumer_vendor_order_identifier(first_name, last_name, address, city, country_code, postal_code, state_code, ssn):
    try:
        payload = consumer_credit_score_payload_new(first_name=first_name, last_name=last_name, address=address,
                                                    city=city, country_code=country_code, postal_code=postal_code,
                                                    state_code=state_code, ssn=ssn)

        consumer_credit_score_new = requests.post(settings.CRS_API_URL,
                                                headers={"Authorization": settings.CRS_AUTHORIZATION,
                                                        "MCL-Interface": settings.CRS_MCL_INTERFACE},
                                                data=payload)

        consumer_credit_score_new = xmltodict.parse(consumer_credit_score_new.content)
        consumer_credit_score_new = dict(consumer_credit_score_new)
        
        # status_code_new = consumer_credit_score_new['MESSAGE']['DEAL_SETS']['DEAL_SET']['DEALS']['DEAL']['SERVICES']['SERVICE']['STATUSES']['STATUS']['StatusCode']
        # statusdescription = consumer_credit_score_new['MESSAGE']['DEAL_SETS']['DEAL_SET']['DEALS']['DEAL']['SERVICES']['SERVICE']['STATUSES']['STATUS']['StatusDescription']
        vendor_order_identifier = consumer_credit_score_new['MESSAGE']['DEAL_SETS']['DEAL_SET']['DEALS']['DEAL']['SERVICES']['SERVICE']['SERVICE_PRODUCT_FULFILLMENT']['SERVICE_PRODUCT_FULFILLMENT_DETAIL']['VendorOrderIdentifier']

        return vendor_order_identifier
    
    except Exception as e:
        print(e)
        return None


def get_consumer_credit_report(first_name, last_name, ssn, vendor_order_identifier):
    try:
        payload = consumer_credit_score_payload_retrieve(first_name=first_name, last_name=last_name, ssn=ssn, vendor_order_identifier=vendor_order_identifier)

        consumer_credit_score_retrieve = requests.post(settings.CRS_API_URL,
                                                headers={"Authorization": settings.CRS_AUTHORIZATION,
                                                        "MCL-Interface": settings.CRS_MCL_INTERFACE},
                                                data=payload)
        

        consumer_credit_score_retrieve = xmltodict.parse(consumer_credit_score_retrieve.content)
        consumer_credit_score_retrieve = dict(consumer_credit_score_retrieve)
        
        consumer_credit_score = consumer_credit_score_retrieve['MESSAGE']['DEAL_SETS']['DEAL_SET']['DEALS']['DEAL']['SERVICES']['SERVICE']['CREDIT']['CREDIT_RESPONSE']['CREDIT_SCORES']['CREDIT_SCORE']['CREDIT_SCORE_DETAIL']['CreditScoreValue']
        # status_code_retrieve = consumer_credit_score_retrieve['MESSAGE']['DEAL_SETS']['DEAL_SET']['DEALS']['DEAL']['SERVICES']['SERVICE']['STATUSES']['STATUS']['StatusCode']
        # status_description_retrieve = consumer_credit_score_retrieve['MESSAGE']['DEAL_SETS']['DEAL_SET']['DEALS']['DEAL']['SERVICES']['SERVICE']['STATUSES']['STATUS']['StatusDescription']

        return consumer_credit_score_retrieve, consumer_credit_score
    
    except Exception as e:
        print(e)
        return None, None
        


# Business Credit Score
def get_business_vendor_order_identifier(business_name, address, city, postal_code, state_code):
    try:
        payload = business_credit_score_payload_new(business_name=business_name, address=address, city=city, postal_code=postal_code, state_code=state_code)

        business_credit_score_new = requests.post(settings.CRS_API_URL,
                                                headers={"Authorization": settings.CRS_AUTHORIZATION,
                                                        "MCL-Interface": settings.CRS_MCL_INTERFACE},
                                                data=payload)

        business_credit_score_new = xmltodict.parse(business_credit_score_new.content)
        business_credit_score_new = dict(business_credit_score_new)
        
        vendor_order_identifier = business_credit_score_new['MESSAGE']['DEAL_SETS']['DEAL_SET']['DEALS']['DEAL']['SERVICES']['SERVICE']['SERVICE_PRODUCT_FULFILLMENT']['SERVICE_PRODUCT_FULFILLMENT_DETAIL']['VendorOrderIdentifier']
        
        return vendor_order_identifier
    
    except Exception as e:
        print(e)
        return None


def get_business_credit_report(business_name, vendor_order_identifier):
    try:
        payload = business_credit_score_payload_retrieve(business_name, vendor_order_identifier)

        business_credit_score_retrieve = requests.post(settings.CRS_API_URL,
                                                headers={"Authorization": settings.CRS_AUTHORIZATION,
                                                        "MCL-Interface": settings.CRS_MCL_INTERFACE},
                                                data=payload)
        
        business_credit_score_retrieve = str(business_credit_score_retrieve.content)
        
        get_index =  business_credit_score_retrieve.find('Intelliscore Plus:')
        if(get_index == -1):
            return 'Score not found'
        
        get_result = business_credit_score_retrieve[get_index:get_index+200]
        business_credit_score = ''.join([n for n in get_result if n.isdigit() or n == '.'])
        
        return business_credit_score
    
    except Exception as e:
        print(e)
        return None