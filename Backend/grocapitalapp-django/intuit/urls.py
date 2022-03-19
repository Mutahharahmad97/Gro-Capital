from django.urls import path, include
from .views import index, oauth, callback, connected, qbo_request
from .api import QuickbooksAssetLiabilitiesAndEquityAPI
from rest_framework import routers

router = routers.DefaultRouter()
router.register('quickbooks-asset-liabilities-and-equity', QuickbooksAssetLiabilitiesAndEquityAPI, 'quickbooks-asset-liabilities-and-equity')

urlpatterns = [
    path('', index, name='index'),
    path('oauth', oauth, name='oauth'),
    path('callback', callback, name='callback'),
    path('connected', connected, name='connected'),
    path('qbo_request', qbo_request, name='qbo_request'),
    path('api/', include(router.urls))
]
