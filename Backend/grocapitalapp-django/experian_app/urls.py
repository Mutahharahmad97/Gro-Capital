from django.urls import path, include
from .api import ExperianAPI, ExperianScoreAPI
from rest_framework import routers

router = routers.DefaultRouter()
router.register('experian', ExperianAPI, 'experian')
router.register('experian_score', ExperianScoreAPI, 'experian_score')

urlpatterns = [
    path('api/', include(router.urls))
]
