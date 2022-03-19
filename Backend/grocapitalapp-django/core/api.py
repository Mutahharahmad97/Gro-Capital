from rest_framework import generics, permissions, viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.decorators import api_view
from itertools import chain
from knox.models import AuthToken
from django.contrib.auth.models import User
from .models import (Plans, Transaction, UserDocumentation, UserPlan, UserPlanHistory, 
    UserProfile, 
    BusinessInformation, 
    PersonalInformation, 
    FinancialInformation, 
    KpiMetrics, 
    LoanHistory
    )
from .serializers import (
    UserSerializer, 
    RegisterSerializer, 
    LinkedinRegisterSerializer, 
    LoginSerializer, 
    ResetPasswordSerializer, 
    CodeVerificationSerializer, 
    ChangePasswordSerializer, 
    UserProfileSerializer, 
    EditUserProfileSerializer, 
    BusinessInformationSerializer, 
    PersonalInformationSerializer, 
    FinancialInformationSerializer, 
    KpiMetricsSerializer, 
    LoanHistorySerializer, 
    TransactionSerializer,
    PlansSerializer,
    UserPlanHistorySerializer,
    UserPlanSerializer,
    UserPasswordResetSerializer,
    UserDocumentationSerializer
    )
from django.contrib.auth import get_user_model
from .services import email_sender_service
import random
import requests
import os
from django.conf import settings
from freshbooks_app.models import *
from intuit.models import *

from plaid_app.models import *

from core.models import UnderWriteDetails
import xmltodict, json

from django.core.mail import send_mail

from grocapital.settings import UNDER_WRITER_API_RESULT_EMAIL,EMAIL_HOST_USER
# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


# Linkedin Register API
class LinkedinRegisterAPI(generics.GenericAPIView):
    serializer_class = LinkedinRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.data.get('code')
        redirect_uri = serializer.data.get('redirect_uri')
        access_token_fetch_url = f'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code={code}&redirect_uri={redirect_uri}&client_id=776xvfin2v6pet&client_secret=FxL3xDU6X7t1G7zd'
        try:
            access_token_request = requests.post(access_token_fetch_url, headers={
                                                 "Content-Type": "application/x-www-form-urlencoded"})
            response_access_token_request = access_token_request.json()
            access_token = response_access_token_request['access_token']

            profile_data = requests.get(
                'https://api.linkedin.com/v2/me', headers={'Authorization': f'Bearer {access_token}'})
            response_profile_data = profile_data.json()
            first_name = response_profile_data['firstName']['localized']['en_US']
            last_name = response_profile_data['lastName']['localized']['en_US']

            email_address_request = requests.get(
                'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))', headers={'Authorization': f'Bearer {access_token}'})
            response_email_address_request = email_address_request.json()
            email_address = response_email_address_request['elements'][0]['handle~']['emailAddress']

            try:
                user = User.objects.create_user(username=email_address, first_name=first_name,
                                                last_name=last_name,  email=email_address)

                return Response({
                    "user": UserSerializer(user, context=self.get_serializer_context()).data,
                    "token": AuthToken.objects.create(user)[1]
                })

            except:
                return Response({
                    "username": [
                        "A user with that username already exists."
                    ]
                }, status=status.HTTP_406_NOT_ACCEPTABLE)

        except Exception as e:
            print(e)
            response = {"error": "Internal Server Error. Try Again!"}
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# Linkedin Login API
class LinkedinLoginAPI(generics.GenericAPIView):
    serializer_class = LinkedinRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        code = serializer.data.get('code')
        redirect_uri = serializer.data.get('redirect_uri')
        access_token_fetch_url = f'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code={code}&redirect_uri={redirect_uri}&client_id=776xvfin2v6pet&client_secret=FxL3xDU6X7t1G7zd'
        try:
            access_token_request = requests.post(access_token_fetch_url, headers={
                                                 "Content-Type": "application/x-www-form-urlencoded"})
            response_access_token_request = access_token_request.json()
            access_token = response_access_token_request['access_token']

            email_address_request = requests.get(
                'https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))', headers={'Authorization': f'Bearer {access_token}'})
            response_email_address_request = email_address_request.json()
            email_address = response_email_address_request['elements'][0]['handle~']['emailAddress']

            try:
                user = User.objects.get(username=email_address)

                return Response({
                    "user": UserSerializer(user, context=self.get_serializer_context()).data,
                    "token": AuthToken.objects.create(user)[1]
                })

            except:
                return Response({
                    "detail": "User does not exist!"
                }, status=status.HTTP_401_UNAUTHORIZED)

        except Exception as e:
            print(e)
            response = {"error": "Internal Server Error. Try Again!"}
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get User API
class UserAPI(generics.RetrieveAPIView,generics.UpdateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


# Password Reset API
class ResetPasswordAPI(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.get(username=serializer.data.get('email'))
            userProfile = UserProfile.objects.get(user=user)

            code = str(random.randint(1376, 9872))

            userProfile.reset_password_code = code
            userProfile.save()

            email_sender_service(str(user.email), code)
            return Response({'message': 'Please check your email address for recovery code'}, status=status.HTTP_200_OK)
        except:
            return Response({'message': 'User not found. Please check your email address'}, status=status.HTTP_404_NOT_FOUND)


# Code Verification API
class CodeVerificationAPI(generics.GenericAPIView):
    serializer_class = CodeVerificationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.get(username=serializer.data.get('email'))
            userProfile = UserProfile.objects.get(user=user)
            if(userProfile.reset_password_code == serializer.data.get('code')):
                return Response({'message': 'Code Verified!'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Wrong Code'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        except:
            return Response({'message': 'User Not Found'}, status=status.HTTP_404_NOT_FOUND)


# Change Password on reset API
class ChangePasswordAPI(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            user = User.objects.get(username=serializer.data.get('email'))
            userProfile = UserProfile.objects.get(user=user)
            if(userProfile.reset_password_code == serializer.data.get('code')):
                if(user.check_password(serializer.data.get('password'))):
                    return Response({'message': 'Old Password Entered'}, status=status.HTTP_406_NOT_ACCEPTABLE)

                user.set_password(serializer.data.get('password'))
                user.save()
                return Response({'message': 'Password Changed Successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Wrong Code'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        except:
            return Response({'message': 'User Not Found'}, status=status.HTTP_404_NOT_FOUND)


# Change Password From the account settings api
class UserPasswordResetAPI(generics.GenericAPIView):
    serializer_class = UserPasswordResetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        old_password_matched=user.check_password(serializer.validated_data["old_password"])
        if old_password_matched:
            user.set_password(serializer.validated_data["new_password"])
            user.save()
            return Response({'message': 'Password Changed Successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Wrong Old password'}, status=status.HTTP_406_NOT_ACCEPTABLE)


# User Profile API

class UserProfileAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()

    def get_object(self):
        return UserProfile.objects.get(user_id=self.request.user.id)

    def list(self, request, *args, **kwargs):
        response = UserProfile.objects.filter(user=self.request.user).values()
        return Response(response)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = serializer.save()
            return Response(UserProfileSerializer(user, context=self.get_serializer_context()).data)

        except:
            return Response({'message': ["User information already exists. Use update request to update user information."]}, status=status.HTTP_403_FORBIDDEN)
        

class EditUserProfileAPI(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = EditUserProfileSerializer
    
    def list(self, request, *args, **kwargs):
        response = {"detail": "Method \"GET\" not allowed."}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            user = self.request.user
            userProfile = UserProfile.objects.get(user=user)
            personalInformation = PersonalInformation.objects.get(user=user)
            
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            if(email):
                user.email = email
                user.username = email
            
            if(password):
                user.set_password(password)
            
            # if not (os.path.isfile(settings.MEDIA_ROOT + '/avatars/' + avatar.name)):
            avatar = request.FILES.get('avatar')
            if(avatar):
                userProfile.avatar = avatar
            
            ssn = serializer.data.get('social_security_number')
            if(ssn):
                personalInformation.social_security_number = ssn
                
            # birthday = serializer.data.get('birthday')
            # if(birthday):
                # personalInformation.birthday = birthday
            
            user.save()
            userProfile.save()
            personalInformation.save()
            
            return Response({'message': ["Data patched successfully"]})
        
        except Exception as e:
            print(e)
            return Response({'message': ["There was problem occured!"]}, status=status.HTTP_403_FORBIDDEN)



# Business Information API
class BusinessInformationAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = BusinessInformationSerializer
    queryset = BusinessInformation.objects.all()

    def get_object(self):
        return BusinessInformation.objects.get(user_id=self.request.user.id)

    def list(self, request, *args, **kwargs):
        response = BusinessInformation.objects.filter(
            user=self.request.user).values()
        return Response(response)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = serializer.save()
            return Response(BusinessInformationSerializer(user, context=self.get_serializer_context()).data)

        except:
            return Response({'message': ["User information already exists. Use update request to update user information."]}, status=status.HTTP_403_FORBIDDEN)


# Personal Information API
class PersonalInformationAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PersonalInformationSerializer
    queryset = PersonalInformation.objects.all()

    def get_object(self):
        return PersonalInformation.objects.get(user_id=self.request.user.id)

    def list(self, request, *args, **kwargs):
        response = PersonalInformation.objects.filter(
            user=self.request.user).values()
        return Response(response)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = serializer.save()
            return Response(PersonalInformationSerializer(user, context=self.get_serializer_context()).data)

        except:
            return Response({'message': ["User information already exists. Use update request to update user information."]}, status=status.HTTP_403_FORBIDDEN)


# Financial Information API
class FinancialInformationAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FinancialInformationSerializer
    queryset = FinancialInformation.objects.all()

    def get_object(self):
        return FinancialInformation.objects.get(user_id=self.request.user.id)

    def list(self, request, *args, **kwargs):
        response = FinancialInformation.objects.filter(
            user=self.request.user).values()
        return Response(response)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = serializer.save()
            return Response(FinancialInformationSerializer(user, context=self.get_serializer_context()).data)

        except:
            return Response({'message': ["User information already exists. Use update request to update user information."]}, status=status.HTTP_403_FORBIDDEN)


# KPI Metrics API
class KpiMetricsAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = KpiMetricsSerializer
    queryset = KpiMetrics.objects.all()

    def get_object(self):
        return KpiMetrics.objects.get(user_id=self.request.user.id)

    def list(self, request, *args, **kwargs):
        response = KpiMetrics.objects.filter(
            user=self.request.user).values()
        return Response(response)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = serializer.save()
            return Response(KpiMetricsSerializer(user, context=self.get_serializer_context()).data)

        except:
            return Response({'message': ["User information already exists. Use update request to update user information."]}, status=status.HTTP_403_FORBIDDEN)


# API to fetch all the data at once
class GetAllData(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request, *args, **kwargs):
        userProfile = UserProfile.objects.filter(
            user=self.request.user).values()
        businessInformation = BusinessInformation.objects.filter(
            user=self.request.user).values()
        personalInformation = PersonalInformation.objects.filter(
            user=self.request.user).values()
        financialInformation = FinancialInformation.objects.filter(
            user=self.request.user).values()
        kpiMetrics = KpiMetrics.objects.filter(
            user=self.request.user).values()
        user = get_user_model().objects.filter(
            id=self.request.user.id).values('first_name', 'last_name', 'email')
        
        freshbookMetrics = FreshbooksProfitLoss.objects.filter(user=self.request.user).values()

        quickbookMetrics = QuickbooksAssetLiabilitiesAndEquity.objects.filter(user=self.request.user).values()
        
        banking_auth = BankingAuth.objects.filter(user=self.request.user).values()

        chained_queryset = chain(user, userProfile, personalInformation, freshbookMetrics,
                                businessInformation, financialInformation, quickbookMetrics, banking_auth)

        queryset = {}
        for i in chained_queryset:
            queryset.update(i)
        
        details = checkDetails(self.request,queryset)

        queryset['underwriter'] = {
            "decision":details.decision,
            "score":details.score,
        }
        queryset.update({
            'personal_info_state': personalInformation[0]['state'] if personalInformation else '',
            'personal_info_city': personalInformation[0]['city'] if personalInformation else '',
            'personal_info_zip': personalInformation[0]['zip'] if personalInformation else ''
            })
        return Response(queryset)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        response = {'message': ['POST function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# Loan History API
class LoanHistoryAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LoanHistorySerializer
    queryset = LoanHistory.objects.all()

    # def list(self, request, *args, **kwargs):
    #     response = LoanHistory.objects.filter(
    #         user=self.request.user).values()
    #     return Response(response)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        return Response(LoanHistorySerializer(user, context=self.get_serializer_context()).data)


# Transaction API
class TransactionAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

    def list(self, request, *args, **kwargs):
        response = Transaction.objects.filter(
            user=self.request.user).values()
        return Response(response)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        return Response(TransactionSerializer(user, context=self.get_serializer_context()).data)


class PlansViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = PlansSerializer
    queryset = Plans.objects.all()


class UserPlanViewSet(viewsets.ModelViewSet, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserPlanSerializer

    def get_queryset(self):
        return UserPlan.objects.filter(
            user=self.request.user
        )

    def get_object(self):
        return UserPlan.objects.get(user_id=self.request.user.id)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class UserDocumentationViewSet(viewsets.ModelViewSet, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserDocumentationSerializer

    # def create(self, request, *args, **kwargs):
    #     user_id = request.data.get("user_id")[0]
    #     doc_types = request.data.get("doc_type")
    #     paths = request.data.get("path")
    #     import pdb; pdb.set_trace()
    #     transformed_data = []
    #     for i in range(len(doc_types)):
    #         data = {
    #             "user_id":user_id,
    #             "doc_type":doc_types[i],
    #             "path":paths[i]
    #         }
    #         transformed_data.append(data)
    #     resp_data = self.serializer_class(data=transformed_data, many=True)
    #     resp_data.is_valid(raise_exception=True)
    #     return Response(resp_data.data)

    def get_queryset(self):
        return UserDocumentation.objects.filter(
            user=self.request.user
        )

    def get_object(self):
        return UserDocumentation.objects.get(user_id=self.request.user.id)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class UserPlanHistoryViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    serializer_class = UserPlanHistorySerializer
    queryset = Plans.objects.all()

    def get_queryset(self):
        return UserPlanHistory.objects.filter(
            user=self.request.user
        )


def checkDetails(request,details):
        try:
            underWriter = UnderWriteDetails.objects.get(user=request.user)
        except:
            pay_load = json.dumps({
            "balance":FindField(details,'balance'),
            "total_bank_accounts":FindField(details,'total_bank_accounts'),
            "total_other_current_assets":FindField(details,'total_other_current_assets'),
            "total_current_assets":FindField(details,'total_current_assets'),
            "total_fixed_assets":FindField(details,'total_fixed_assets'),
            "total_assets":FindField(details,'total_assets'),
            "accounts_payable":FindField(details,'accounts_payable'),
            "accounts_recieveable":FindField(details,'accounts_recieveable'),
            "total_accounts_payable":FindField(details,'total_accounts_payable'),
            "total_other_current_liabilities":FindField(details,'total_other_current_liabilities'),
            "total_current_liabilities":FindField(details,'total_current_liabilities'),
            "total_long_term_liabilities":FindField(details,'total_long_term_liabilities'),
            "total_liabilities":FindField(details,'total_liabilities'),
            "total_equity":FindField(details,'total_equity'),
            "total_liabilities_and_equity":FindField(details,'total_liabilities_and_equity'),
            "company_name":FindField(details,'company_name'),
            "currency_code":"USD",
            "end_date":FindField(details,'end_date'),
            "total_expenses":FindField(details,'total_expenses'),
            "total_income":FindField(details,'total_income'),
            "gross_profit_ytd":FindField(details,'gross_profit_ytd'),
            "net_profit_ytd":FindField(details,'net_profit_ytd'),
            "net_profit_1":FindField(details,'net_profit_1'),
            "net_profit_2":FindField(details,'net_profit_2'),
            "net_profit_3":FindField(details,'net_profit_3'),
            "gross_profit_1":FindField(details,'gross_profit_1'),
            "gross_profit_2":FindField(details,'gross_profit_2'),
            "gross_profit_3":FindField(details,'gross_profit_3'),
            "cogs_py_1":FindField(details,'cogs_py_1'),
            "cogs_py_2":FindField(details,'cogs_py_2'),
            "cogs_py_3":FindField(details,'cogs_py_3'),
        })
            try:
                net_monthly_income = int(details['net_profit_ytd'])/12
            except:
                net_monthly_income = 0
            try:
                requested_amount = FinancialInformation.objects.get(user=request.user)
                requested_amount = requested_amount.amount
            except:
                requested_amount = 0

            url = f"https://modocap.underwrite.ai/?requested_amount={requested_amount}&net_monthly_income={net_monthly_income}"
            headers = {
            'Content-Type': 'application/json'
            }

            response = requests.request("POST", url, headers=headers, data=pay_load)

            json_response = xmltodict.parse(response.text)

            parse_json_response = json.dumps(json_response)

            parse_json_response = json.loads(parse_json_response)
            
            id = parse_json_response['modocap']['ID']
            decision = parse_json_response['modocap']['Decision']
            score = parse_json_response['modocap']['Score']

            underWriter = UnderWriteDetails(user=request.user,id=id,decision=decision,score=score,status=True)
            underWriter.save()

            send_mail(
            f'Underwriter Result. Score: {score} - User: {request.user.email}',
            str(parse_json_response),
            EMAIL_HOST_USER,
            UNDER_WRITER_API_RESULT_EMAIL,
            fail_silently=False,
        )
        
        return underWriter

def FindField(details,find_field):
    try:
        text = details[find_field].replace(',','')
        return text.replace('$','')
    except:
        return '0'


    