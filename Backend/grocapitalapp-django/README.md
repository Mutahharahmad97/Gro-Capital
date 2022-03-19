# Gro Capital Django
## Installation

Gro Capital Django requires [Python v3.8.5](https://www.python.org/downloads/release/python-385/) and [Django 3.1.7](https://www.djangoproject.com/download/) to run.
Install the dependencies and start the server. Server runs at localhost:8000

### Setup Database
```sh
Make a server in postgres
Add a user with password 
Add a database named 'grocapital' into your server
Run postgres server
Verify the running port for your postgres is 5432
```

### Setup VirutalEnv
```sh
Create a virtual environment with python 3.8.5
Activate virtual environment
```

### To Run
```sh
cd grocapitalapp-django
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Admin
```sh
Make new admin user by executing "python manage.py createsuperuser"
Hit localhost:8000/admin to access admin panel and registered models
```

## Environment variables
Create a .env in grocapitalapp-django/grocapital
### .env variables
| key | value |
| ------ | ------ |
| DATABASE_USERNAME | Your postgres database username |
| DATABASE_PASSWORD | Your postgres database password|
| DJANGO_SECRET_KEY | your-secret-key |

## URLs
| key | value |
| ------ | ------ |
| Server Base URL | localhost:8000 |
| Admin URL | localhost:8000/admin |

## Notes
```sh
if environ fails use "pip install django-environ"
if psycopg2 fails, use "pip install psycopg2-binary"
```