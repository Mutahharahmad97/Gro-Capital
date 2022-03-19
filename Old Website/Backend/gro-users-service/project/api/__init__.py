#project/api/__init__.py
from flask_restplus import Api

### Importing Namespaces
from .auth import api as auth
from .users import api as users
from .companies import api as companies
from .banking import api as banking
from .accounting import api as accounting
from .social_media import api as social_media
from .gro_scores import api as gro_scores
from .applicants import api as applicants
from .deployment import api as deployment
from .dnbapi import api as dnb
from .equity import api as equity
from flask import url_for

from .experian import api as experian


### Uncomment for https deployment
@property
def specs_url(self):
	return url_for(self.endpoint('specs'), _external=True, _scheme='https')

# Api.specs_url = specs_url

### Define API with restplus.api
api = Api (
    version='1.1',
    title='Gro Users API', 
    description="Gro User Restful API"
)

api.add_namespace(auth)
api.add_namespace(applicants)
api.add_namespace(users)
api.add_namespace(companies)
api.add_namespace(accounting)
api.add_namespace(banking)
api.add_namespace(social_media)
api.add_namespace(gro_scores)
api.add_namespace(deployment)

api.add_namespace(equity)
api.add_namespace(dnb)
api.add_namespace(experian)