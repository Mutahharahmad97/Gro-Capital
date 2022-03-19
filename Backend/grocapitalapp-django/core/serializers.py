from django.db.models import fields
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions
from rest_framework.fields import CurrentUserDefault
from .models import (
    UserProfile, 
    BusinessInformation, 
    PersonalInformation, 
    FinancialInformation, 
    KpiMetrics, 
    Transaction, 
    LoanHistory,
    Plans,
    UserPlan,
    UserPlanHistory,
    UserDocumentation
    )

# User Serializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name',
                  'last_name', 'email', 'password')
        # extra_kwargs = {'password': {'write_only': True ,'allow_blank': True}}
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], first_name=validated_data['first_name'],
                                        last_name=validated_data['last_name'],  email=validated_data['email'], password=validated_data['password'])

        return user
    
    
class LinkedinRegisterSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)
    redirect_uri = serializers.CharField(required=True)

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise exceptions.AuthenticationFailed("Incorrect Credentials")


# User Profile Serializer
class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserProfile
        fields = '__all__'
        

class EditUserProfileSerializer(serializers.Serializer):
    avatar = serializers.ImageField(required=False)
    email = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    # birthday = serializers.CharField(required=False)
    # driver_license_number = serializers.CharField(required=False)
    social_security_number = serializers.CharField(required=False)
        
# Password Update Serializer
class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    
class CodeVerificationSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    code = serializers.CharField(required=True)
    
class ChangePasswordSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    code = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

# Business Information Serializer
class BusinessInformationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = BusinessInformation
        fields = '__all__'


# Personal Information Serializer
class PersonalInformationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = PersonalInformation
        fields = '__all__'


# Financial Information Serializer
class FinancialInformationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = FinancialInformation
        fields = '__all__'


# KPI Metrics Serializer
class KpiMetricsSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = KpiMetrics
        fields = '__all__'


# Loan History Serializer
class LoanHistorySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = LoanHistory
        fields = '__all__'


# Transactions Serializer
class TransactionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Transaction
        fields = '__all__'

class UserPasswordResetSerializer(serializers.Serializer):
    old_password = serializers.CharField(style={"input_type": "password"}, write_only=True)
    new_password = serializers.CharField(style={"input_type": "password"}, write_only=True)


# Plan Serializers
class PlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plans
        fields = '__all__'


class UserPlanSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserPlan
        fields = '__all__'
        depth = 1


class UserPlanHistorySerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserPlanHistory
        fields = '__all__'


class UserDocumentationSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserDocumentation
        fields = '__all__'
