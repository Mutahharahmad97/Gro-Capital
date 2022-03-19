from django.db import models
from django.conf import settings


class BankingAuth(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    account_id = models.CharField(max_length=200)
    account_number = models.CharField(max_length=200)
    balance = models.CharField(max_length=100)
    routing_number = models.CharField(max_length=100)
    
    def __str__(self):
        return self.user.username