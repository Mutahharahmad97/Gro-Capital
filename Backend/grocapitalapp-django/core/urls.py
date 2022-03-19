from django.urls import path, include
from .api import (
    RegisterAPI, 
    LinkedinRegisterAPI, 
    LoginAPI, 
    LinkedinLoginAPI, 
    ResetPasswordAPI, 
    CodeVerificationAPI, 
    ChangePasswordAPI, 
    TransactionAPI, 
    UserAPI, 
    UserProfileAPI, 
    EditUserProfileAPI, 
    BusinessInformationAPI, 
    PersonalInformationAPI, 
    FinancialInformationAPI, 
    KpiMetricsAPI, 
    GetAllData, 
    LoanHistoryAPI, 
    TransactionAPI, 
    UserPasswordResetAPI,
    PlansViewSet,
    UserPlanViewSet,
    UserPlanHistoryViewSet,
    UserDocumentationViewSet
    )
from knox import views as knox_views
from rest_framework import routers

router = routers.DefaultRouter()
# router.register('password-update', UserPasswordUpdateAPI, 'password-update')
router.register('user-profile', UserProfileAPI, 'user-profile')
router.register('edit-user-profile', EditUserProfileAPI, 'edit-user-profile')
router.register('business-information',
                BusinessInformationAPI, 'business-information')
router.register('personal-information',
                PersonalInformationAPI, 'personal-information')
router.register('financial-information',
                FinancialInformationAPI, 'financial-information')
router.register('kpi-metrics', KpiMetricsAPI, 'kpi-metrics')
router.register('get-all-data', GetAllData, 'get-all-data')
router.register('loan-history', LoanHistoryAPI, 'loan-history')
router.register('transaction', TransactionAPI, 'transaction')
router.register('plan', PlansViewSet, 'plan')
router.register('user-plan', UserPlanViewSet, 'user-plan')
router.register('user-plan-history', UserPlanHistoryViewSet, 'user-plan-history')
router.register('user-docs', UserDocumentationViewSet, 'user-docs')

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/linkedin-register', LinkedinRegisterAPI.as_view()),
    path('api/auth/linkedin-login', LinkedinLoginAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/reset-password', ResetPasswordAPI.as_view()),
    path('api/auth/settings/reset-password', UserPasswordResetAPI.as_view()),
    path('api/auth/code-verification', CodeVerificationAPI.as_view()),
    path('api/auth/change-password', ChangePasswordAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/', include(router.urls))
]
