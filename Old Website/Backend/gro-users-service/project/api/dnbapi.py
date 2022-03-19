# project/api/companies.py

from flask import Blueprint, jsonify, request, render_template
from flask_restplus import Namespace, Resource, fields
from project.api.models import Company, Stakeholders, Financial,DnbJson
from project import db
from sqlalchemy import exc
import requests
import json
import datetime
from pytz import reference

DNB_USERNAME = "P2000000BCD079BB78A4EB3B03F1D4D3"
DNB_PASSWORD = "testapi@12"

dnb_blueprint = Blueprint('dnb', __name__, template_folder='templates')
api = Namespace('dnb', description='Connect and Get Company data from from D&B server')

def get_dnb_token(username, password, url="https://maxcvservices.dnb.com/rest/Authentication"):
    """Get a new authentication token.
    See http://developer.dnb.com/docs/2.0/common/authentication-process
    :param username: D&B username
    :type username: str
    :param password: D&B password
    :type password: str
    :returns: authentication token or "INVALID CREDENTIALS"
    :rtype: str
    """
    r = requests.post(
        url,
        headers={
            "x-dnb-user": username,
            "x-dnb-pwd": password,
        }
    )
    return r.headers["Authorization"]

@api.route('/connectToDNB')
class Connecting(Resource):
    def get(self, url="https://maxcvservices.dnb.com/rest/Authentication"):
        r = requests.post(
            url,
            headers={
                "x-dnb-user": DNB_USERNAME,
                "x-dnb-pwd": DNB_PASSWORD,
            }
        )
        if r.status_code >= 400:
            return ''
        response_object = jsonify({
            'status':'success',
            'message': 'Successfully connecting to DNB',
            'data': url,
        })
        response_object.status_code = 200
        return response_object
        # return r.headers["Authorization"]


@api.route('/rating/<string:duns>')
class GetRating(Resource):
    def get(self,duns):
        token = get_dnb_token(DNB_USERNAME, DNB_PASSWORD)
        # url = "https://direct.dnb.com/V5.0/organizations/%s/products/DCP_STD"
        url = "https://direct.dnb.com/V5.0/organizations/%s/products/RTNG_TRND"
        headers = {"Authorization": token}
        r = requests.get(url % duns, headers=headers)
        try:
            data = r.json()['OrderProductResponse']["OrderProductResponseDetail"]["Product"]["Organization"]["Assessment"]
            if data !="":
                response = data
                rate_update = Company.query.filter_by(duns=duns).first()
                rate_update.rating = data['DNBStandardRating']['DNBStandardRating']
                rate_update.last_time_rating_fetched = datetime.datetime.now()
                db.session.add(rate_update)
                db.session.commit()
                
                now = datetime.datetime.now()
                # Check DUNS number is exists or not
                exists = DnbJson.query.filter_by(duns=duns).count() 
                if  exists > 0:
                    dnbjson_update = DnbJson.query.filter_by(duns=duns).first()
                    dnbjson_update.created_date = now.strftime("%Y-%m-%d"),
                    dnbjson_update.created_time = now.strftime("%H:%M:%S")
                    db.session.add(dnbjson_update)
                    db.session.commit()
                else:
                    raw_json = DnbJson(duns=duns,json_data=json.dumps(response, ensure_ascii=False), created_date = now.strftime("%Y-%m-%d"),created_time = now.strftime("%H:%M:%S"))
                    db.session.add(raw_json)
                    db.session.commit()  
                # Return success response status and message
                response_object = jsonify({
                    'status': 1,
                    'message': '',
                    'data': data            
                })
                response_object.status_code = 200
                return response_object  
        except Exception as e:
            response_object = jsonify({
                'status': 0,
                'message': 'Company not available with this DUNS number',
                'status_code': 200
            })
            response_object.status_code = 200
            return response_object
        # return r.json()['OrderProductResponse']["OrderProductResponseDetail"]["Product"]["Organization"]["Assessment"]

    @api.expect()
    def post(self,duns):
        """ Making a specific API call """
        token = get_dnb_token(DNB_USERNAME, DNB_PASSWORD)
        url = "https://direct.dnb.com/V5.0/organizations/%s/products/RTNG_TRND"
        headers = {"Authorization": token,'accept': 'application/json'}
        r = requests.get(url % duns, headers=headers)
        try:
            data = r.json()['OrderProductResponse']["OrderProductResponseDetail"]["Product"]["Organization"]["Assessment"]
            if data !="":
                response = data
                rate_update = Company.query.filter_by(duns=duns).first()
                rate_update.rating = data['DNBStandardRating']['DNBStandardRating']
                rate_update.last_time_rating_fetched = datetime.datetime.now()
                db.session.add(rate_update)
                db.session.commit()
                
                now = datetime.datetime.now()
                # Check DUNS number is exists or not
                exists = DnbJson.query.filter_by(duns=duns).count() 
                if  exists > 0:
                    dnbjson_update = DnbJson.query.filter_by(duns=duns).first()
                    dnbjson_update.created_date = now.strftime("%Y-%m-%d"),
                    dnbjson_update.created_time = now.strftime("%H:%M:%S")
                    db.session.add(dnbjson_update)
                    db.session.commit()
                else:
                    raw_json = DnbJson(duns=duns,json_data=json.dumps(response, ensure_ascii=False), created_date = now.strftime("%Y-%m-%d"),created_time = now.strftime("%H:%M:%S"))
                    db.session.add(raw_json)
                    db.session.commit()  
                # Return success response status and message
                response_object = jsonify({
                    'status': 'success',
                    'message': '',
                    'data': data            
                })
                response_object.status_code = 201
                return response_object  
        except Exception as e:
            response_object = jsonify({
                'status': 'fail',
                'message': 'Invalid payload.',
            })
            response_object.status_code = 400
            return response_object    

@api.route('/financial/<string:duns>')
class GetFinancialDetails(Resource):
    def get(self,duns):
        token = get_dnb_token(DNB_USERNAME, DNB_PASSWORD)
        url = "https://direct.dnb.com/V4.0/organizations/%s/products/FIN_ST_PLUS"
        headers = {"Authorization": token}
        r = requests.get(url % duns, headers=headers)
        try:
            data = r.json()['OrderProductResponse']["OrderProductResponseDetail"]["Product"]["Organization"]["Financial"]
            response = data
            now = datetime.datetime.now()
            
            exists = Financial.query.filter_by(duns=duns).count() 
            if  exists > 0:
                finance_update = Financial.query.filter_by(duns=duns).first()
                finance_update.created_date = now.strftime("%Y-%m-%d"),
                finance_update.created_time = now.strftime("%H:%M:%S")
                db.session.add(finance_update)
                db.session.commit()
            else:
                raw_json = Financial(duns=duns,json_data=json.dumps(data, ensure_ascii=False), created_date = now.strftime("%Y-%m-%d"),created_time = now.strftime("%H:%M:%S"))
                db.session.add(raw_json)
                db.session.commit()  
            response_object = jsonify({
                        'status': 1,
                        'message': '',
                        'data': data            
                    })
            response_object.status_code = 200
            return response_object 
        except Exception as e:
            response_object = jsonify({
                        'status': 1,
                        'message': 'Financial details not available',
                        'status_code': 200          
                    })
            response_object.status_code = 200
            return response_object 
        
        # return r.json()['OrderProductResponse']["OrderProductResponseDetail"]["Product"]["Organization"]["Financial"]

    def post(self,duns):
        token = get_dnb_token(DNB_USERNAME, DNB_PASSWORD)
        url = "https://direct.dnb.com/V4.0/organizations/%s/products/FIN_ST_PLUS"
        headers = {"Authorization": token}
        r = requests.get(url % duns, headers=headers)
        data = r.json()['OrderProductResponse']["OrderProductResponseDetail"]["Product"]["Organization"]["Financial"]
       
        # financial = Financial(
        #     duns = duns,
        #     financial_statement_todate = data['FinancialStatement'][0]['StatementHeaderDetails']['FinancialStatementToDate']['$'],
        #     currency_iso_alpha3_code = data['FinancialStatement'][0]['StatementHeaderDetails']['CurrencyISOAlpha3Code'],
        #     fiscalindicator = data['FinancialStatement'][0]['StatementHeaderDetails']['FiscalIndicator'],
        #     auditindicator = data['FinancialStatement'][0]['StatementHeaderDetails']['AuditIndicator'],
        #     financial_statement_fromdate = data['FinancialStatement'][0]['StatementHeaderDetails']['FinancialStatementFromDate']['$']
        # )

        
        # db.session.add(financial)
        # db.session.commit()
        return data
