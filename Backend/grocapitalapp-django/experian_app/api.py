from rest_framework import  permissions, viewsets, status
from rest_framework.response import Response
from .models import Experian
from core.models import BusinessInformation
from .services import get_access_token, get_experian_score, get_credit_score, get_business_score
# from .serializers import ExperianSerializer

class ExperianAPI(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Experian.objects.all()
    
    def create(self, request):
        try:
            access_token = get_access_token()
            credit_score = get_credit_score(access_token)
            business_score = get_business_score(access_token)
            experian = Experian()
            experian.user = request.user
            experian.credit_score = credit_score
            experian.business_score = business_score
            experian.save()
            
            return Response({'message': ["Experian data updated successfully"]}, status.HTTP_200_OK)
        
        except:
            response = {"message": "Internal Server Error. Try Again!"}
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def list(self, request):
        response = Experian.objects.filter(user=self.request.user).values()
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
    
    
class ExperianScoreAPI(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Experian.objects.all()
    
    def create(self, request):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def list(self, request):
        try:
            access_token = get_access_token()
            user_business_information = BusinessInformation.objects.filter(user_id=self.request.user.id).values('duns')
            duns = user_business_information[0]['duns']
            response = get_experian_score(access_token, duns)
            return Response({"response" : response}, status.HTTP_200_OK)
        
        except:
            response = {"message": "Internal Server Error. Try Again!"}
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
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