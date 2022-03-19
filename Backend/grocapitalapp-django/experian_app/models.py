from django.db import models
from django.conf import settings
from datetime import datetime

class Experian(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date_created = models.DateTimeField(default=datetime.now, null=True, blank=True)
    credit_score = models.JSONField(null=True, blank=True)
    business_score = models.JSONField(null=True, blank=True)
    
    def __str__(self):
        return self.user.username