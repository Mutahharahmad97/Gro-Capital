from django.db import models
from django.conf import settings


class QuickbooksAssetLiabilitiesAndEquity(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    total_bank_accounts = models.CharField(max_length=200)
    total_other_current_assets = models.CharField(max_length=200)
    total_current_assets = models.CharField(max_length=200)
    total_fixed_assets = models.CharField(max_length=200)
    total_assets = models.CharField(max_length=200)
    
    accounts_payable = models.CharField(max_length=200)
    
    accounts_recieveable = models.CharField(max_length=200)

    total_accounts_payable = models.CharField(max_length=200)
    total_other_current_liabilities = models.CharField(max_length=200)
    total_current_liabilities = models.CharField(max_length=200)
    total_long_term_liabilities = models.CharField(max_length=200)
    total_liabilities = models.CharField(max_length=200)
    total_equity = models.CharField(max_length=200)
    total_liabilities_and_equity = models.CharField(max_length=200)

    def __str__(self):
        return self.user.username
