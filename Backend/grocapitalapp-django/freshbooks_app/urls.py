from django.urls import path, include
from .views import index, oauth, callback, connected
from .api import FreshbooksProfitLossAPI
from rest_framework import routers

router = routers.DefaultRouter()
router.register('freshbooks-profit-loss', FreshbooksProfitLossAPI, 'freshbooks-profit-loss')

urlpatterns = [
    path('', index, name='index'),
    path('oauth/<str:profile_id>', oauth, name='oauth'),
    path('callback', callback, name='callback'),
    path('connected', connected, name='connected'),
    path('api/', include(router.urls)),
]
