from django.db import models
from django.conf import settings
from core.models import UserProfile

class FreshbooksProfitLoss(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    company_name = models.CharField(max_length=200)
    currency_code = models.CharField(max_length=200)
    end_date = models.CharField(max_length=200)
    total_expenses = models.CharField(max_length=200)
    total_income = models.CharField(max_length=200)

    gross_profit_ytd = models.CharField(max_length=200)

    net_profit_ytd = models.CharField(max_length=200,default='0')

    net_profit_1 = models.CharField(max_length=200)
    net_profit_2 = models.CharField(max_length=200)
    net_profit_3 = models.CharField(max_length=200)

    gross_profit_1 = models.CharField(max_length=200)
    gross_profit_2 = models.CharField(max_length=200)
    gross_profit_3 = models.CharField(max_length=200)

    cogs_py_1 = models.CharField(max_length=200)
    cogs_py_2 = models.CharField(max_length=200)
    cogs_py_3 = models.CharField(max_length=200)
    
    def __str__(self):
        return self.user.username



class AccountMetrics(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    cogs_ytd = models.FloatField(default=0)
    
    shareholder_equity_py_1 = models.FloatField(default=0)
    shareholder_equity_py_2 = models.FloatField(default=0)
    shareholder_equity_py_3 = models.FloatField(default=0)
    working_capital_py_1 = models.FloatField(default=0)
    working_capital_py_2 = models.FloatField(default=0)
    working_capital_py_3 = models.FloatField(default=0)
    cash_in_py_1 = models.FloatField(default=0)
    cash_in_py_2 = models.FloatField(default=0)
    cash_in_py_3 = models.FloatField(default=0)
    cash_out_py_1 = models.FloatField(default=0)
    cash_out_py_2 = models.FloatField(default=0)
    cash_out_py_3 = models.FloatField(default=0)
    cash_closing_py_1 = models.FloatField(default=0)
    cash_closing_py_2 = models.FloatField(default=0)
    cash_closing_py_3 = models.FloatField(default=0)

