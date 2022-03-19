from django.db.models.query import QuerySet
from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from .models import FreshbooksProfitLoss
from .serializers import FreshbooksProfitLossSerializer

# QuickBooks Assets API
class FreshbooksProfitLossAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FreshbooksProfitLossSerializer
    queryset = FreshbooksProfitLoss.objects.all()

    def list(self, request, *args, **kwargs):
        response = FreshbooksProfitLoss.objects.filter(user=self.request.user).values()
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

        print(request.data)

        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            return Response(FreshbooksProfitLossSerializer(user, context=self.get_serializer_context()).data)
        else:
            print(serializer.errors)
            return Response({'message': ["User information already exists. Use update request to update user information."]}, status=status.HTTP_403_FORBIDDEN)

            