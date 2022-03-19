from django.db.models import fields
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions
from rest_framework.fields import CurrentUserDefault
from .models import CRS

# CRS Serializer
class CrsSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = CRS
        fields = '__all__'