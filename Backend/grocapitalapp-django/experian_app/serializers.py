from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault
from .models import Experian

class ExperianSerializer(serializers.Serializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Experian
        fields = '__all__'