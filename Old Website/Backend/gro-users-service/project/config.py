# project/config.py
import os

class BaseConfig:
    """Base configuration"""
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'gradeALoan'
    BCRYPT_LOG_ROUNDS = 15
    TOKEN_EXPIRATION_DAYS = 30
    TOKEN_EXPIRATION_SECONDS = 0
    # Flask-Security config
    SECURITY_URL_PREFIX = "/admin"
    SECURITY_PASSWORD_HASH = "pbkdf2_sha512"
    SECURITY_PASSWORD_SALT = "ATGUOHAELKiubahiughaerGOJAEGj"

    # Flask-Security URLs, overridden because they don't put a / at the end
    SECURITY_LOGIN_URL = "/login/"
    SECURITY_LOGOUT_URL = "/logout/"
    SECURITY_REGISTER_URL = "/register/"

    SECURITY_POST_LOGIN_VIEW = "/admin/"
    SECURITY_POST_LOGOUT_VIEW = "/admin/"
    SECURITY_POST_REGISTER_VIEW = "/admin/"

    # Flask-Security features
    SECURITY_REGISTERABLE = True
    SECURITY_SEND_REGISTER_EMAIL = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Plaid Configuration
    PLAID_CLIENT_ID= '5a9591e08d9239244b8063ad'
    PLAID_SECRET='eee49e6a0701f60eea4319bbf96282' 
    PLAID_ENV='development' 
    PLAID_PUBLIC_KEY='02e15ef6f47e6ecb5377f4e3f26d82'


class DevelopmentConfig(BaseConfig):
    """Development configuration"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://gro_admin:gradeALoan@gro-db.cwefacw5askg.us-west-1.rds.amazonaws.com:5432/users'
    # SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:dtreepass@127.0.0.1:5432/demo'
    BCRYPT_LOG_ROUNDS = 4


class TestingConfig(BaseConfig):
    """Testing configuration"""
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_TEST_URL')
    BCRYPT_LOG_ROUNDS = 4
    TOKEN_EXPIRATION_DAYS = 0
    TOKEN_EXPIRATION_SECONDS = 3


class ProductionConfig(BaseConfig):
    """Production configuration"""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = "postgresql://gro_admin:gradeALoan@gro-db.cwefacw5askg.us-west-1.rds.amazonaws.com:5432/users"
