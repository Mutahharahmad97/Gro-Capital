import plaid
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from .serializers import BankingAuthSerializer
from .models import BankingAuth

client = plaid.Client(client_id='5caf76d70b1c9e001530190c',
                      secret='e11781b99eb6a68b81a4796016a2a9',
                      environment='development')


class CreateLinkTokenAPI(viewsets.ViewSet):
    def create(self, request):
        # Get the client_user_id by searching for the current user
        # user = User.find(...)
        # client_user_id = user.id
        # Create a link_token for the given user
        response = client.LinkToken.create({
            'user': {
                'client_user_id': '1',
            },
            'products': ["auth"],
            'client_name': 'Plaid Test App',
            'country_codes': ['US'],
            'language': 'en',
            'webhook': 'https://webhook.sample.com',
        })
        # Send the data to the client
        return Response(response)


class SetAccessTokenAPI(viewsets.ViewSet):
    def create(self, request):
        # global access_token
        # global item_id
        public_token = request.POST.get('public_token', None)
        try:
            exchange_response = client.Item.public_token.exchange(public_token)
            request.session['access_token'] = exchange_response['access_token']
            return Response(exchange_response)
        except Exception as e:
            return Response(e)


class AuthAPI(viewsets.ViewSet):
    def create(self, request):
        public_token = request.POST.get('public_token', None)
        try:
            exchange_response = client.Item.public_token.exchange(public_token)
            access_token = exchange_response['access_token']
            print(access_token)
            response = client.Auth.get(access_token)
            return Response(response)
        except Exception as e:
            print(e)
            return Response('e')
        
class BankingAuthAPI(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsAuthenticated]
    # serializer_class = BankingAuthSerializer
    # queryset = BankingAuth.objects.all()
    
    def list(self, request, *args, **kwargs):
        response = BankingAuth.objects.filter(user=self.request.user).values()
        return Response(response)
    
    def create(self, request):
        bank_data = request.data
        for data in bank_data:
            try:
                bank_auth_data = BankingAuth.objects.get(account_number=data['account_number'],user=self.request.user)
                bank_auth_data.balance = data['balance']
                bank_auth_data.account_id = data['account_id']
                bank_auth_data.save()
            
            except:
                try:
                    BankingAuth.objects.create(user=self.request.user, name=data['name'], account_id=data['account_id'], account_number=data['account_number'], 
                                           balance=data['balance'], routing_number=data['routing_number'])
                except Exception as e:
                    print(e)
                    return Response({'message': 'Fields missing!'}, status=404)
        
        return Response({'message': 'Bank auth data added successfully.'})