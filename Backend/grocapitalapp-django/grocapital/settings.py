from pathlib import Path
import os
import environ

env = environ.Env()
# reading .env file
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

MEDIA_ROOT  = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'wz3h^v6+@ein!iu36)y&e_wgj!=w&v-m0i+l!4rgaff+kmx61!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'crs_app',
    'experian_app',
    'plaid_app',
    'freshbooks_app',
    'intuit',
    'core',
    'rest_framework',
    'corsheaders',
    'knox',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',)
}

# CORS_ORIGIN_WHITELIST = (
#     'http://localhost:3000',
#     'http://demo.grocapitalapp.com',
#     'http://54.193.106.150',
#     'http://ec2-54-193-106-150.us-west-1.compute.amazonaws.com',
#     'http://54.241.113.87',
#     'http://ec2-54-241-113-87.us-west-1.compute.amazonaws.com',
# )

CORS_ORIGIN_ALLOW_ALL = True

# REST_KNOX = {
#     'TOKEN_TTL': None,
# }

ROOT_URLCONF = 'grocapital.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'grocapital.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'grocapital',
        'USER': env('DATABASE_USERNAME'), 
        'PASSWORD': env('DATABASE_PASSWORD'),
        'HOST': '127.0.0.1', 
        'PORT': '5432',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'


# QUICKBOOKS

# OAauth2 Config Here

# DEVELOPMENT
# CLIENT_ID = 'ABIYF5KE8njn9yhzuD6XXttZyXb7pgsdCv8yp4Gw8kKKH5uPqA'
# CLIENT_SECRET = 'YDiTn8OO17vqN5ZnT6nWyMdXxfjk6jb3JLXs7ouE'
# REDIRECT_URI = 'http://localhost:8000/intuit/callback'
# ENVIRONMENT = 'sandbox'
# QUICKBOOKS_MIDDLEWARE = 'http://localhost:3000'

# # PRODUCTION
CLIENT_ID = 'ABQTl7DmsYgfzzl3jky8g3AIs9ea5CEib8q3y4Dn2dMnWif4aY'
CLIENT_SECRET = 'kFGUiqPCg87jArG5I5OnKREf20XIPdPuMtbQV3oa'
REDIRECT_URI = 'https://backend.grocapitalapp.com/intuit/callback'
ENVIRONMENT = 'production'
QUICKBOOKS_MIDDLEWARE = 'https://demo.grocapitalapp.com'

# QBO Base URLs
QBO_BASE_SANDBOX = 'https://sandbox-quickbooks.api.intuit.com'
QBO_BASE_PROD = 'https://quickbooks.api.intuit.com'

# QUICKBOOKS END


# FRESHBOOKS

# DEVELOPMENT
# FRESHBOOKS_MIDDLEWARE = 'http://localhost:3000'
# FRESHBOOKS_REDIRECT_URI =  'https://ec03-2601-18c-8b01-a700-7ce1-193-5a27-2499.ngrok.io/freshbooks_app/callback'

# PRODUCION
FRESHBOOKS_CLIENT_ID = '434bbed25c36a039940e2bda2355212db05097cac802f2b80b9129c4a4f55444'
FRESHBOOKS_CLIENT_SECRET = 'ff347d19a26f491697aad723c79ad6b350024467604ad0d1ba65b44b9e5dbda9'
FRESHBOOKS_REDIRECT_URI = 'https://backend.grocapitalapp.com/freshbooks_app/callback'
FRESHBOOKS_MIDDLEWARE = 'https://demo.grocapitalapp.com'

# END FRESHBOOKS

# Underwrite api result email 

UNDER_WRITER_API_RESULT_EMAIL = ['alinoman91@gmail.com','shehrozkapoor@gmail.com']

# EMAIL SERVICE SETTINGS
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'alinomangrocapital@gmail.com'
EMAIL_HOST_PASSWORD = 'grocapital97'

# EXPERIAN 

EXPERIAN_USERNAME = 'todd@modocap.com'
EXPERIAN_PASSWORD = 'Codeerror00@'
EXPERIAN_CLIENT_ID = 'gRcXGEv25v9FOvBV1pKsAC8wjZy8UJ1s'
EXPERIAN_CLIENT_SECRET = 'mIwL8f5QWIBli9Dz'

# EXPERIAN END

# CRS START

# DEVELOPMENT
# CRS_API_URL = 'https://demo.mortgagecreditlink.com/inetapi/request_products.aspx'
# CRS_AUTHORIZATION = 'Basic bW9kb2NhcDoyMzM4c3Y2Nw=='
# CRS_MCL_INTERFACE = 'SmartAPITestingIdentifier'


# PRODUCTION
CRS_API_URL = 'https://crs.meridianlink.com/inetapi/request_products.aspx'
CRS_AUTHORIZATION = 'Basic TU9ET0FQSToyNzU0ZTVmMA=='
CRS_MCL_INTERFACE = 'ModoCapital11232021'

# CRS END