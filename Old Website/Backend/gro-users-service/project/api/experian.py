import urllib
import json
import requests
import random
import base64
import os
import json

from flask import Blueprint, jsonify, request, render_template, redirect, session
from flask_restplus import Namespace, Resource, reqparse, fields

from project.api.models import  User,Company
from project import db
import requests
import json
import getpass
import datetime


USERID = 'todd@modocap.com'
PASSWORD = 'Modo5ity!1'
CLIENT_ID = 'klGdxKAZrhl6ZOA6ak0Ov8mE10ZxSARL'
CLIENT_SECRET = '5QTkAGExxUQ6yCsT'

api = Namespace('experian', description='Connect and Get Data')

company_fields = api.model('Company', {
    'uid': fields.String(description="User UID", required=True),
    'access_token': fields.String(description="access token", required=True),
})


@api.route('/connectToExperian')
class Connecting(Resource):
    def get(self):
        url = 'https://sandbox-us-api.experian.com/oauth2/v1/token'
        params = {
            'response_type': 'code',
            'state': get_CSRF_token(request),
            'client_id': CLIENT_ID
        }
        url += '?' + urllib.parse.urlencode(params)
        response_object = jsonify({
            'status': 'success',
            'message': 'Successfully connecting to Experian',
            'data': url
        })
        response_object.status_code = 200
        return response_object


@api.route('/score')
class GetScore(Resource):
    def post(self):
        headers = {'content-type': 'application/json',
                   'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET}
        data = {"username": USERID, "password": PASSWORD}
        response = requests.post(
            "https://sandbox-us-api.experian.com/oauth2/v1/token", json=data, headers=headers)
        data = json.loads(response.text)

        if response.status_code == 400:
            response_object = jsonify({
                'status': 'fail',
                'messsage': 'Not getting access code',
                'data': data
            })
        else:
            response_object = jsonify({
                'status': 'success',
                'message': 'Successfully receive and save code',
                'data': {
                    'expires_in': data['expires_in'],
                    'token_type': data['token_type'],
                    'access_token': data['access_token'],
                    'refresh_token': data['refresh_token'],
                }
            })
            binum = request.args.get('bin', None)
            route = 'https://sandbox-us-api.experian.com/businessinformation/sbcs/v1/scores'
            auth_header = 'Bearer ' + data['access_token']
            headers = {'Authorization': auth_header,
                       'Content-Type': 'application/json', }
            parameters = json.dumps({"bin": binum, "subcode": "0517635"})
            response = requests.post(route, headers=headers, data=parameters)
            status_code = response.status_code
            if status_code != 200:
                response = jsonify({
                    'status': 0,
                    'message': 'Wrong BIN number',
                    'status_code': 200
                })
                return response
            response = json.loads(response.text)
            experian_data = response['results']['sbcsScore']['score']
            # STORE SCORE IN DB\
            try:
                if experian_data != "":
                    score_update = Company.query.filter_by(
                        bin_number=binum).first()
                    score_update.experian_score = experian_data
                    score_update.experian_score_fetched_time = datetime.datetime.now()
                    db.session.add(score_update)
                    db.session.commit()
            except Exception as e:
                print(e)
                response = jsonify({
                    'status': 0,
                    'message': 'Somthing Wrong to store data',
                    'status_code': 200
                })
                return response
            return response['results']['sbcsScore'], status_code
        return data

# Prequalification Credit Score
@api.route('/creditscore')
class GetCreditScore(Resource):
    def post(self):
        headers = {'content-type': 'application/json',
                   'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET}
        data = {"username": USERID, "password": PASSWORD}
        response = requests.post(
            "https://sandbox-us-api.experian.com/oauth2/v1/token", json=data, headers=headers)
        data = json.loads(response.text)

        if response.status_code == 400:
            response_object = jsonify({
                'status': 'fail',
                'messsage': 'Not getting access code',
                'data': data
            })
        else:
            response_object = jsonify({
                'status': 'success',
                'message': 'Successfully receive and save code',
                'data': {
                    'expires_in': data['expires_in'],
                    'token_type': data['token_type'],
                    'access_token': data['access_token'],
                    'refresh_token': data['refresh_token'],
                }
            })
            auth_header = 'Bearer ' + data['access_token']
            headers = {'Authorization': auth_header, 'Content-Type': 'application/json',
                       'Accept': 'application/json', 'clientReferenceId': 'SBMYSQL', }
            data = request.get_json()
            response = requests.post(
                'https://sandbox-us-api.experian.com/consumerservices/prequal/v1/credit-score', headers=headers, json=data)
            data = response.json()
            if data != " ":
                try:
                    score = data['customSolution'][0]['riskModel'][0]['score']
                    print('SCORE:', score)
                except KeyError as e:
                    data = jsonify({
                        'status': 'fail',
                        'message': 'Invalid payload.',
                    })
            return data
