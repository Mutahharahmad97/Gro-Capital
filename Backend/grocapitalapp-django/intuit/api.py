from django.db.models.query import QuerySet
from rest_framework import generics, permissions, serializers, viewsets, exceptions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from itertools import chain
from knox.models import AuthToken
from .models import QuickbooksAssetLiabilitiesAndEquity
from .serializers import QuickbooksAssetLiabilitiesAndEquitySerializer
from django.contrib.auth import get_user_model

# QuickBooks Assets API
class QuickbooksAssetLiabilitiesAndEquityAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = QuickbooksAssetLiabilitiesAndEquitySerializer
    queryset = QuickbooksAssetLiabilitiesAndEquity.objects.all()

    def list(self, request, *args, **kwargs):
        response = QuickbooksAssetLiabilitiesAndEquity.objects.filter(user=self.request.user).values()
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

        if serializer.is_valid():
            user = serializer.save()
            return Response(QuickbooksAssetLiabilitiesAndEquitySerializer(user, context=self.get_serializer_context()).data)

        else:
            print(serializer.errors)
            return Response({'message': ["User information already exists. Use update request to update user information."]}, status=status.HTTP_403_FORBIDDEN)