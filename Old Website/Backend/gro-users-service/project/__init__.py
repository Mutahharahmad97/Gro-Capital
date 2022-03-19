# project/__init__.py
import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS,cross_origin
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_static_compress import FlaskStaticCompress

# instantiate extensions
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()

def create_app():
    # instantiate the app
    app = Flask(__name__, static_folder='./api/static',template_folder='./api/templates')
    app.config['COMPRESSOR_DEBUG'] = app.config.get('DEBUG')
    app.config['COMPRESSOR_STATIC_PREFIX'] = 'static'
    app.config['COMPRESSOR_OUTPUT_DIR'] = 'build'
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.static_folder = './api/static'
    compress = FlaskStaticCompress(app)

    # enable CORS
    CORS(app)

    # set config
    app_settings = 'project.config.DevelopmentConfig'
    app.config.from_object(app_settings)

    # set up extensions
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)

    # import blueprints
    from project.api.users import users_blueprint
    from project.api.auth import auth_blueprint
    from project.api.companies import companies_blueprint
    from project.api.banking import banking_blueprint

    # register blueprints
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(users_blueprint)
    app.register_blueprint(companies_blueprint)
    app.register_blueprint(banking_blueprint)
    
    return app
