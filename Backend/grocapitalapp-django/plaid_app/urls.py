from django.urls import path, include
from .api import CreateLinkTokenAPI, SetAccessTokenAPI, AuthAPI, BankingAuthAPI
from rest_framework import routers

router = routers.DefaultRouter()
router.register('create-link-token', CreateLinkTokenAPI, 'create-link-token')
router.register('set-access-token', SetAccessTokenAPI, 'set-access-token')
router.register('plaid-auth', AuthAPI, 'plaid-auth')
router.register('banking-auth', BankingAuthAPI, 'banking-auth')

urlpatterns = [
    path('api/', include(router.urls))
]
