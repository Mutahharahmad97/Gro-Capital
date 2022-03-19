from rest_framework import permissions, viewsets, status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from .models import CRS
from .services import get_consumer_vendor_order_identifier, get_consumer_credit_report, get_business_vendor_order_identifier, get_business_credit_report
# import time
import json
from django.contrib.auth.models import User
from core.models import PersonalInformation, BusinessInformation

class CrsConsumerCreditScoreAPI(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        try:
            first_name = self.request.user.first_name
            last_name = self.request.user.last_name
            personalInformation = PersonalInformation.objects.get(user=self.request.user)
            address=personalInformation.home_address_1
            city=personalInformation.city
            postal_code=personalInformation.zip
            state_code=personalInformation.state_code
            ssn=personalInformation.social_security_number
            ssn = ssn.replace('-', '')
            
            if(first_name is not None and last_name is not None and address is not None and city is not None and postal_code is not None and state_code is not None and ssn is not None):
                vendor_order_identifier = get_consumer_vendor_order_identifier(first_name=first_name, last_name=last_name, address=address,
                                                                        city=city, country_code='US', postal_code=postal_code, state_code=state_code, ssn=ssn)
            else:
                return Response({'message': 'Must have all the required fields available for credit score report'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if(vendor_order_identifier is not None):
                consumer_credit_score_retrieve, consumer_credit_score = get_consumer_credit_report(first_name=first_name, last_name=last_name, ssn=ssn, vendor_order_identifier=vendor_order_identifier)
            else:
                return Response({'message': 'Internal Server Error. Vendor order identifier was not found!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            if(consumer_credit_score_retrieve is not None and consumer_credit_score is not None):
                crs = CRS()
                crs.user = request.user
                crs.consumer_credit_report = json.dumps(consumer_credit_score_retrieve)
                consumer_credit_score =  str(int(consumer_credit_score))
                crs.consumer_credit_score = consumer_credit_score
                crs.save()
            
            else:
                return Response({'message': 'Could not find consumer credit report or credit score for this user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'message': "CRS consumer credit report data updated successfully", 'score': consumer_credit_score}, status.HTTP_200_OK)

        except Exception as e:
            print(e)
            response = {"message": "Internal Server Error. Try Again!"}
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request):
        response = {'message': ['GET function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def patch(self, request, *args, **kwargs):
        response = {'message': ['PATCH function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class CrsBusinessCreditScoreAPI(viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        try:
            # businessInformation = BusinessInformation.objects.get(user=self.request.user)
            # business_name=businessInformation.corporate_name
            # address=businessInformation.business_physical_address
            # city=businessInformation.city
            # postal_code=businessInformation.zip
            # state_code=businessInformation.state_code
            
            business_name = 'Hong Kong Express'
            address = '6767 W Sunset Blvd'
            city = 'Los Angeles'
            postal_code = '90028'
            state_code = 'CA'
            
            if(business_name is not None and address is not None and city is not None and postal_code is not None and state_code is not None):
                vendor_order_identifier = get_business_vendor_order_identifier(business_name=business_name, address=address, city=city, postal_code=postal_code, state_code=state_code)
            else:
                return Response({'message': 'Must have all the required fields available for business score report'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
            if(vendor_order_identifier is not None):
                business_credit_score = get_business_credit_report(business_name=business_name, vendor_order_identifier=vendor_order_identifier)
                if(business_credit_score == "Score not found"):
                    return Response({'message': 'Score not found for this user!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({'message': 'Internal Server Error. Vendor order identifier was not found!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
            if(business_credit_score is not None):
                crs = CRS()
                crs.user = request.user
                crs.business_credit_score = business_credit_score
                crs.save()
            
            else:
                return Response({'message': 'Could not find business credit score for this user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            
            return Response({'message': "CRS business credit report data updated successfully", 'score': business_credit_score}, status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            response = {"message": "Internal Server Error. Try Again!"}
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request):
        response = {'message': ['GET function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def put(self, request, *args, **kwargs):
        response = {'message': ['PUT function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def patch(self, request, *args, **kwargs):
        response = {'message': ['PATCH function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def delete(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        response = {'message': ['DELETE function not allowed']}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)