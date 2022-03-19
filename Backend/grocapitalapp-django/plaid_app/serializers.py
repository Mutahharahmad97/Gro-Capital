from .models import BankingAuth
from rest_framework import serializers

class BankingAuthSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = BankingAuth
        fields = '__all__'
        