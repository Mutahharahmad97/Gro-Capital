from django.contrib import admin
from .models import UserProfile, BusinessInformation, PersonalInformation, FinancialInformation, KpiMetrics, Transaction, LoanHistory,UnderWriteDetails

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(BusinessInformation)
admin.site.register(PersonalInformation)
admin.site.register(FinancialInformation)
admin.site.register(KpiMetrics)
admin.site.register(LoanHistory)
admin.site.register(Transaction)
admin.site.register(UnderWriteDetails)
