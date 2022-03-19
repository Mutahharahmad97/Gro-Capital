from django.urls import path, include
from .api import CrsConsumerCreditScoreAPI, CrsBusinessCreditScoreAPI
from rest_framework import routers

router = routers.DefaultRouter()
router.register('crs_consumer_credit_score', CrsConsumerCreditScoreAPI, 'crs_consumer_credit_score')
router.register('crs_business_credit_score', CrsBusinessCreditScoreAPI, 'crs_business_credit_score')

urlpatterns = [
    path('api/', include(router.urls))
]
