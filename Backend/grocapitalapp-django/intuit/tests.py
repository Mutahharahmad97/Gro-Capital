from django.test import TestCase

# Create your tests here.
# if settings.ENVIRONMENT == 'production':
#     CLIENT_ID = settings.CLIENT_ID
#     CLIENT_SECRET = settings.CLIENT_SECRET
#     REDIRECT_URI = settings.REDIRECT_URI
#     ENVIRONMENT = settings.ENVIRONMENT
# else:
#     CLIENT_ID = settings.CLIENT_ID_DEVELOPMENT
#     CLIENT_SECRET = settings.CLIENT_SECRET_DEVELOPMENT
#     REDIRECT_URI = settings.REDIRECT_URI_DEVELOPMENT
#     ENVIRONMENT = settings.ENVIRONMENT_DEVELOPMENT


# auth_client_connected = AuthClient(
    #     CLIENT_ID,
    #     CLIENT_SECRET,
    #     REDIRECT_URI,
    #     ENVIRONMENT,
    #     access_token=request.session.get('access_token', None),
    #     refresh_token=request.session.get('refresh_token', None),
    #     id_token=request.session.get('id_token', None),
    # )
    
    
    # if auth_client_connected.id_token is not None:
    #     return render(request, 'connected.html', context={'openid': True, 'total_bank_accounts': total_bank_accounts})
    # else:
        # return render(request, 'connected.html', context={'openid': False})