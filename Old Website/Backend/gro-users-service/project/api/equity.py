# project/api/companies.py
import os
from flask import Blueprint, jsonify, request, render_template, Flask
from flask_restplus import Namespace, Resource, fields
from project.api.models import Equity
from project import db
from sqlalchemy import exc
from werkzeug.utils import secure_filename
from .utils import upload_file
from flask import send_file

equities_blueprint = Blueprint('equity', __name__, template_folder='templates')
api = Namespace('equity', description='equity create, view')
app = Flask(__name__)
ALLOWED_EXTENSIONS = set(['mp4'])



equity_fields = api.model('New Equity', {
    'name': fields.String(description="Name", required=True),
    'email_address': fields.String(description="Email Address", required=True),
    'position': fields.String(description="Position", required=False),
    'experience':fields.String(description="Experience and Expertise", required=False),
    'industry_understanding':fields.String(description="management teams depth of industry understanding", required=False),
    'external_works':fields.String(description="strength of management teams external network", required=False),
    'anuual_spand':fields.String(description="market’s annual spend on the problem you are solving", required=False),
    'market_Structure': fields.String(description="Market Structure", required=False),
    'traction': fields.String(description="Traction", required=False),
    'partnership_status':fields.String(description="Partnership Status", required=False),
    'idea':fields.String(description="State", required=False), 
    'time_spent_business':fields.String(description="Spent on the Business", required=False),
    'money_in_business':fields.String(description="money have you in the business", required=False),
    'advantage': fields.String(description="competitive advantages have you received", required=False),
    'summary':fields.String(description="Company Summary", required=False),
    'profile_pitch_video': fields.String(description="Increase the impact of your profile by uploading a short pitch video.", required=True),
    'management_team': fields.String(description="Management Team", required=False),
    'customer_problems': fields.String(description="Customer Problems", required=False),
    'products_services': fields.String(description="Products and Services", required=False),
    'target_market': fields.String(description="target_market", required=False),
    'business_model': fields.String(description="Business Model", required=False),
    'customer_segments': fields.String(description="Customer Segments", required=False),
    'strategy': fields.String(description="Sales and Marketing Strategy", required=False),
    'competitors': fields.String(description="Competitors", required=False),
    'competitive_advantage': fields.String(description="Competitive Advantage", required=False),
    'pitch_video': fields.String(description="Upload Pitch Video", required=False),
})


equity = api.model('Update Equity', {
    'name': fields.String(description="Name", required=True),
    'email_address': fields.String(description="Email Address", required=True),
    'position': fields.String(description="Position", required=False),
    'experience':fields.String(description="Experience and Expertise", required=False),
    'industry_understanding':fields.String(description="management teams depth of industry understanding", required=False),
    'external_works':fields.String(description="strength of management teams external network", required=False),
    'anuual_spand':fields.String(description="market’s annual spend on the problem you are solving", required=False),
    'market_Structure': fields.String(description="Market Structure", required=False),
    'traction': fields.String(description="Traction", required=False),
    'partnership_status':fields.String(description="Partnership Status", required=False),
    'idea':fields.String(description="State", required=False), 
    'time_spent_business':fields.String(description="Spent on the Business", required=False),
    'money_in_business':fields.String(description="money have you in the business", required=False),
    'advantage': fields.String(description="competitive advantages have you received", required=False),
    'summary':fields.String(description="Company Summary", required=False),
    'profile_pitch_video': fields.String(description="Increase the impact of your profile by uploading a short pitch video.", required=True),
    'management_team': fields.String(description="Management Team", required=False),
    'customer_problems': fields.String(description="Customer Problems", required=False),
    'products_services': fields.String(description="Products and Services", required=False),
    'target_market': fields.String(description="target_market", required=False),
    'business_model': fields.String(description="Business Model", required=False),
    'customer_segments': fields.String(description="Customer Segments", required=False),
    'strategy': fields.String(description="Sales and Marketing Strategy", required=False),
    'competitors': fields.String(description="Competitors", required=False),
    'competitive_advantage': fields.String(description="Competitive Advantage", required=False),
    'pitch_video': fields.String(description="Upload Pitch Video", required=False),
})

@api.route('/pitch_video/<string:filename>')
class PitchVideo(Resource):
    @api.doc('get media file')
    def get(self, filename):
        base = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),'pitch_video')
        return send_file(os.path.join(base, filename))

@api.route('/profile_pitch_video/<string:filename>')
class profile_pitch_video(Resource):
    @api.doc('get media file')
    def get(self, filename):
        base = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))),'profile_pitch_video')
        return send_file(os.path.join(base, filename))

@api.route('/')
class EquityList(Resource):
    # Get the list of all EquityList
    @api.doc('get_all_equities')
    def get(self):
        """ Get all equities """
        equities = Equity.query.all()
        equities_list = []
        for equity in equities:
            equity_object = {
                'uid':equity.uid,
                'name': equity.name,
                'email_address':equity.email_address,
                'position':equity.position,
                'experience':equity.experience,
                'industry_understanding':equity.industry_understanding,
                'external_works': equity.external_works,
                'anuual_spand': equity.anuual_spand,
                'market_Structure':equity.market_Structure,
                'traction': equity.traction,
                'partnership_status':equity.partnership_status,
                'idea': equity.idea,
                'time_spent_business':equity.time_spent_business,
                'money_in_business':equity.money_in_business,
                'advantage':equity.advantage,
                'summary':equity.summary,
                'profile_pitch_video': equity.profile_pitch_video,
                'management_team': equity.management_team,
                'customer_problems':equity.customer_problems,
                'products_services':equity.products_services,
                'target_market':equity.target_market,
                'business_model':equity.business_model,
                'customer_segments':equity.customer_segments,
                'strategy':equity.strategy,
                'competitors':equity.competitors,
                'competitive_advantage':equity.competitive_advantage,
                'pitch_video':equity.pitch_video
            }
            equities_list.append(equity_object)

        response_object = jsonify({
            'status':'success',
            'data':{    
                'equities':equities_list
            }
        })
        response_object.status_code = 200
        return response_object

    # Create a new company
    @api.doc('create_a_equity')
    @api.expect(equity_fields)
    def post(self):
        """ Create a new equity """
        import json
        # post_data = request.POST
        post_data=request.form
        print("POSTDATA: %s"%(post_data))
        name = post_data.get('name')
        email_address = post_data.get('email_address')
        position = post_data.get('position')
        experience = post_data.get('experience')
        industry_understanding = post_data.get('industry_understanding')
        external_works = post_data.get('external_works')
        anuual_spand = post_data.get('anuual_spand')
        market_Structure = post_data.get('market_Structure')
        traction = post_data.get('traction')
        partnership_status = post_data.get('partnership_status')
        idea = post_data.get('idea')
        time_spent_business = post_data.get('time_spent_business')
        money_in_business = post_data.get('money_in_business')
        advantage = post_data.get('advantage')
        summary = post_data.get('summary')
        profile_pitch_video = 'profile_pitch_video'
        management_team = post_data.get('management_team')
        customer_problems = post_data.get('customer_problems')
        products_services = post_data.get('products_services')
        target_market = post_data.get('target_market')
        business_model = post_data.get('business_model')
        customer_segments = post_data.get('customer_segments')
        strategy = post_data.get('strategy')
        competitors = post_data.get('competitors')
        competitive_advantage = post_data.get('competitive_advantage')
        pitch_video = 'pitch_video'
        
        # Return fail when receiving duplicated ein
        try:
            # equity = Equity.query.filter_by(name=name).first()
            # if not equity:
                # Add new companies to database
                # Store the file
                _, pitch_video, _ = upload_file(pitch_video,request,'pitch_video/',ALLOWED_EXTENSIONS)
                _, profile_pitch_video, message = upload_file(profile_pitch_video,request,'profile_pitch_video/',ALLOWED_EXTENSIONS)
                db.session.add(Equity(name=name, email_address=email_address,position=position,
                experience=experience,
                industry_understanding=industry_understanding,
                external_works=external_works,
                anuual_spand=anuual_spand,
                market_Structure=market_Structure,
                traction=traction,
                partnership_status=partnership_status,
                idea=idea,
                time_spent_business=time_spent_business,
                money_in_business=money_in_business,
                advantage=advantage,
                summary=summary,
                profile_pitch_video=profile_pitch_video,
                management_team=management_team,
                customer_problems=customer_problems,
                products_services=products_services,
                target_market=target_market,
                business_model=business_model,
                customer_segments=customer_segments,
                strategy=strategy,competitors=competitors,
                competitive_advantage=competitive_advantage,
                pitch_video=pitch_video))
                db.session.commit()
                newEquity = Equity.query.filter_by(name=name).order_by(Equity.id.desc()).first()
                # Return success response status and message
                response_object = jsonify({
                    'status': 'success',
                    'message': '%s was added!'%(name),
                    'data': {
                        "uid":newEquity.uid,
                        "name":newEquity.name,
                        "email_address":newEquity.email_address,
                        "industry_understanding":newEquity.industry_understanding,
                        "external_works":newEquity.external_works,
                        "anuual_spand":newEquity.anuual_spand,
                        "market_Structure":newEquity.market_Structure,
                        "traction":newEquity.traction,
                        "partnership_status":newEquity.partnership_status,
                        "idea":newEquity.idea,
                        "time_spent_business":newEquity.time_spent_business,
                        "money_in_business":newEquity.money_in_business,
                        "advantage":newEquity.advantage,
                        "summary":newEquity.summary,
                        "profile_pitch_video":newEquity.profile_pitch_video,
                        "management_team":newEquity.management_team,
                        "customer_problems":newEquity.customer_problems,
                        "products_services":newEquity.products_services,
                        "target_market":newEquity.target_market,
                        "business_model":newEquity.business_model,
                        "customer_segments":newEquity.customer_segments,
                        "strategy":newEquity.strategy,
                        "competitive_advantage":newEquity.competitive_advantage,
                        "pitch_video":newEquity.pitch_video,   
                    }
                })
                response_object.status_code = 201
                return response_object
            # else :
            #     response_object = jsonify({
            #         'status': 'fail',
            #         'message': 'Sorry. That equity already exists.'
            #     })
            #     response_object.status_code = 400   
            #     return response_object
        except (exc.IntegrityError, ValueError) as e:
            print(e)
            db.session.rollback()
            response_object = jsonify({
                'status': 'fail',
                'message': 'Invalid payload.',
            })
            response_object.status_code = 400
            return response_object


@api.route('/ping')
class Ping(Resource):
    @api.doc('ping_pong')
    def get(self):
        """Ping tesing users endpoints"""
        return jsonify({
            'status':'success',
            'message':'inside equity ping!'
        })

# Get Equity data by ID from Database
@api.route('/<string:uid>')
@api.response(404, 'Equity not found')
@api.param('uid', 'The Equity unique identifier')
class Single_Equity(Resource):
    @api.doc('Get a Single Equity')
    def get(self, uid):
        """ Getting single Equity details """

        # Default response object
        response_object = jsonify({
            'status':'fail',
            'message':'Equity does not exist'
        })

        try:
            print("GETTING DATA on %s from database"%(uid))
            equity = Equity.query.filter_by(uid=uid).first()
            if not equity:
                response_object.status_code = 404
                return response_object
            else:
                response_object = jsonify({
                    'status':'success',
                    'data': {
                         "uid":equity.uid,
                        "name":equity.name,
                        "email_address":equity.email_address,
                        "industry_understanding":equity.industry_understanding,
                        "external_works":equity.external_works,
                        "anuual_spand":equity.anuual_spand,
                        "market_Structure":equity.market_Structure,
                        "traction":equity.traction,
                        "partnership_status":equity.partnership_status,
                        "idea":equity.idea,
                        "time_spent_business":equity.time_spent_business,
                        "money_in_business":equity.money_in_business,
                        "advantage":equity.advantage,
                        "summary":equity.summary,
                        "profile_pitch_video":equity.profile_pitch_video,
                        "management_team":equity.management_team,
                        "customer_problems":equity.customer_problems,
                        "products_services":equity.products_services,
                        "target_market":equity.target_market,
                        "business_model":equity.business_model,
                        "customer_segments":equity.customer_segments,
                        "strategy":equity.strategy,
                        "competitive_advantage":equity.competitive_advantage,
                        "pitch_video":equity.pitch_video,   
                    }
                })
                response_object.status_code = 200
                print(response_object)
                return response_object
        except ValueError:
            response_object.status_code = 404
            return response_object

    @api.expect(equity)
    def put(self, uid):
        put_data = request.get_json()
        print("REQUEST DATA: %s"%(put_data))
        equityData = Equity.query.filter_by(uid=uid).first()
        print(equityData)
        if not equityData:
            response = jsonify({
                'status':'fail',
                'message': 'Fail to pull user data',
                'status_code': 401
            })
            return response
        else:
            print("Setting uod for %s"%(uid))
            for key, value in put_data.items():
                print("Updating %s with %s "%(key,value))
                setattr(equityData, key, value)     
                
            db.session.add(equityData)
            try:
                db.session.commit()
            except:
                db.session.rollback()
                raise
            response = jsonify({
                'status':'success', 
                'message': 'Successfully update  profile',
                'update':  put_data
            })
            response.status_code = 200
            return response


