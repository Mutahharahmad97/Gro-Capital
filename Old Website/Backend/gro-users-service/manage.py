# manage.py
import os
from flask import Flask, url_for, redirect, render_template, request, abort, jsonify

# Importing libraries
import unittest
import coverage

from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand

from project import create_app, db
from project.api import api
from project.api.models import AdminUser, User, Company, roles_users, Role, Gro_Score, Input


from flask_migrate import MigrateCommand, Migrate

## Admin Libraries
import flask_admin as Admin
from flask_admin.model.base import get_mdict_item_or_list, get_redirect_target
from flask_admin.contrib.sqla import ModelView, filters
from flask_admin.contrib import sqla
from flask_admin.contrib.sqla import ModelView, filters
from flask_admin import helpers as admin_helpers
from flask_admin import BaseView, expose

## Flask Security
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required, current_user
from flask_security.utils import encrypt_password

## Import Pandas
from sklearn.externals import joblib
import pandas as pd
# from OpenSSL import SSL
# context = SSL.Context(SSL.SSLv23_METHOD)
# cer = '/etc/letsencrypt/live/api.grocapitalapp.com/fullchain.pem'
# key = '/etc/letsencrypt/live/api.grocapitalapp.com/privkey.pem'
# context = (cer, key)

# Code Coverage Testing
COV = coverage.coverage(
    branch=True,
    include='project/*',
    omit=[
        'project/tests/*',
        'project/server/config.py',
        'project/server/*/__init__.py'
    ]
)

COV.start()

app = create_app()
api.init_app(app)
migrate = Migrate(app, db)

# Manager Configuration
manager = Manager(app)
manager.add_command('db', MigrateCommand)
# manager.add_command('runserver', Server(host='0.0.0.0', port=8000,ssl_context=context))
manager.add_command('runserver', Server(host='0.0.0.0', port=8000))

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, AdminUser, Role)
security = Security(app, user_datastore)


# - Password
# - UID
# - Facebook Uid
# - Facebook Access Token
# - LinkedIn Access Token
# - Google Uid
# - Google Access Token
# - Plaid Access Token
# - Quickbooks Access Token
# - Quickbooks Id

# Create customized model view class - User View
class UserModelView(sqla.ModelView):
    can_delete = False
    can_create = False
    can_view_details = True
    column_exclude_list = [
        'uid',
        'password', 
        'facebook_uid', 
        'facebook_access_token',
        'google_uid',
        'google_access_token',
        'plaid_access_token',
        'quickbook_id',
        'quickbook_access_token',
        'linkedin_access_token'
    ]
    def ssn_formatter(view, context, model, name):
        if model.ssn:
           secret_ssn = "###-##-%s"%(str(model.ssn)[-4:])
           return secret_ssn
        else:
           return ""

    column_formatters = {
        'ssn': ssn_formatter
    }
    def is_accessible(self):
        if not current_user.is_active or not current_user.is_authenticated:
            return False

        if current_user.has_role('superuser'):
            return True

        return False

    def _handle_view(self, name, **kwargs):
        """
        Override builtin _handle_view in order to redirect users when a view is not accessible.
        """
        if not self.is_accessible():
            if current_user.is_authenticated:
                # permission denied
                abort(403)
            else:
                # login
                return redirect(url_for('security.login', next=request.url))

# Create customized model view class - Company View
class CompanyModelView(sqla.ModelView):
    can_delete = False
    can_create = False
    can_view_details = True
    def is_accessible(self):
        if not current_user.is_active or not current_user.is_authenticated:
            return False

        if current_user.has_role('superuser'):
            return True

        return False

    def _handle_view(self, name, **kwargs):
        """
        Override builtin _handle_view in order to redirect users when a view is not accessible.
        """
        if not self.is_accessible():
            if current_user.is_authenticated:
                # permission denied
                abort(403)
            else:
                # login
                return redirect(url_for('security.login', next=request.url))
# Admin Configuration
admin = Admin.Admin(
    app, name='Gro Capital Admin', 
    base_template='my_master.html', 
    template_mode='bootstrap3'
)





class LoanApplicants(ModelView):
    can_view_details = True
    # details_template = 'admin/applicant_detail.html'
    @expose('/',methods=('GET', 'POST'))
    def index_view(self):
        users = User.query.all()
        return self.render('admin/applicants.html',users=users )


    @expose('/details/', methods=('GET', 'POST'))
    def details_view(self):
        return_url = self.get_url('.index_view')

        if not self.can_view_details:
            return redirect(return_url)

        id = get_mdict_item_or_list(request.args, 'id')
        if id is None:
            return redirect(return_url)

        applicant = self.get_one(id)
        company_uid = applicant.company
        score = Gro_Score.query.filter_by(company_uid=company_uid).first()
        bank_accounts = applicant.bank_accounts
        balance_sheet_reports = applicant.balance_sheet_reports
        profit_loss_reports = applicant.profit_loss_reports
        cash_flow_reports = applicant.cash_flow_reports
        company = Company.query.filter_by(uid=company_uid).first()

        ml_input = Input.query.filter_by(company_uid=company_uid).first()

        if applicant is None:
            flash(gettext('Record does not exist.'), 'error')
            return redirect(return_url)

        if self.details_modal and request.args.get('modal'):
            template = self.details_modal_template
        else:
            template = self.details_template

        return self.render('admin/applicant_detail.html',
                           applicant=applicant,
                           ml_input=ml_input,
                           score=score,
                           bank_accounts=bank_accounts,
                           balance_sheet_reports=balance_sheet_reports,
                           cash_flow_reports=cash_flow_reports,
                           profit_loss_reports=profit_loss_reports,
                           company=company,
                           details_columns=self._details_columns,
                           get_value=self.get_list_value,
                           return_url=return_url)

    @expose('/details/gro_score_update/', methods=('GET', 'POST'))
    def gro_score_update(self):
        id = get_mdict_item_or_list(request.args, 'id')
        applicant = self.get_one(id)
        company_uid = applicant.company
        score = Gro_Score.query.filter_by(company_uid=company_uid).first()
        data_score = score.data_score
        ml_score = score.ml_score
        gro_score = data_score + ml_score
        response_object = jsonify({
             "user id": id, 
             "data_score": data_score,
             "ml_score": ml_score,
             "gro_score": gro_score
        })
        response_object.status_code = 200
        return response_object

    # @expose('/details/income_statement_update/', methods=('GET','POST'))
    # def income_statement_update(self):
    #     id = get_mdict_item_or_list(request.args, 'id')
    #     applicant = self.get_one(id)
    #     reports = applicant.profit_loss_reports
    #     print(reports.count())
    #     response_object = jsonify({
    #         "user id": id
    #     })
    #     response_object.status_code = 200
    #     return response_object


# Get All Users from Database
admin.add_view(LoanApplicants(User, db.session,name="Loan Applicants", endpoint='loan_applicants'))
admin.add_view(UserModelView(User, db.session, name="Users"))
admin.add_view(CompanyModelView(Company, db.session, name="Companies"))

@security.context_processor
def security_context_processor():
    return dict(
        admin_base_template=admin.base_template,
        admin_view=admin.index_view,
        h=admin_helpers,
        get_url=url_for
    )

# Create Test
@manager.command
def test():
	tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
	result = unittest.TextTestRunner(verbosity=2).run(tests)
	if result.wasSuccessful():
		return 0
	return 1

# Code Converage test
@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('project/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    clf = joblib.load('Logistic_Regression.pkl')
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    return 1

# Create recreate_db command to create DB
@manager.command
def recreate_db():
    """Recreates a database."""
    db.drop_all()
    db.create_all()
    db.session.commit()

# Seed Database with some initial Data
@manager.command
def seed_db():
    """Seeds the database."""
    db.session.add(Company(company_name='Top Flight', address='1968 S. Coast Hwy #592', city='Laguna Beach',state='CA', zipcode='92651'))
    db.session.add(Company(company_name='Infinity Labs', address='6795 S Edmond St, 3rd Floor', city='Las Vegas',state='NV', zipcode='89118'))
    db.session.add(User(email="delighted@troy.do", password="12345678", status="registered", admin=True))
    db.session.add(User(email="mcdonald@trump.com", password="skcihcnaissurevol", status="registered", admin=False))
    db.session.commit()

@manager.option('-h', '--host', dest='host', default='0.0.0.0')
@manager.option('-p', '--port', dest='port', type=int, default=6969)
@manager.option('-w', '--workers', dest='workers', type=int, default=3)
def gunicorn(host, port, workers):
    """Start the Server with Gunicorn"""
    from gunicorn.app.base import Application

    class FlaskApplication(Application):
        def init(self, parser, opts, args):
            return {
                'bind': '{0}:{1}'.format(host, port),
                'workers': workers
            }

        def load(self):
            return app

    application = FlaskApplication()
    return application.run()

if __name__ == '__main__':
  manager.run()
