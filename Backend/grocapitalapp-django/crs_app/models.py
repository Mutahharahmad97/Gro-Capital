from django.db import models
from django.conf import settings
from datetime import datetime

class CRS(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=datetime.now, null=True, blank=True)
    consumer_credit_report = models.JSONField(null=True, blank=True)
    consumer_credit_score = models.CharField(max_length=10, null=True, blank=True)
    business_credit_score = models.CharField(max_length=10, null=True, blank=True)
    
    def __str__(self):
        return self.user.username