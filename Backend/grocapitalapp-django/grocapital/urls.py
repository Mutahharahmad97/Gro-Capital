from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    path('intuit/', include('intuit.urls'), name='intuit'),
    path('freshbooks_app/', include('freshbooks_app.urls'), name='freshbooks_app'),
    path('plaid_app/', include('plaid_app.urls'), name='plaid_app'),
    path('experian_app/', include('experian_app.urls'), name='experian_app'),
    path('crs_app/', include('crs_app.urls'), name='crs_app')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
