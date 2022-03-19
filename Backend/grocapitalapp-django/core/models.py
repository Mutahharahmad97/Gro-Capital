from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

# User Profile model extending user model
class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    avatar = models.ImageField(null=True, upload_to='avatars/', blank=True)
    title = models.CharField(max_length=20, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    form_step = models.IntegerField(null=True)
    reset_password_code = models.CharField(max_length=4, null=True, blank=True)

    # def save(self, *args, **kwargs):
    #     super(UserProfile, self).save(*args, **kwargs)
    #     default_free_plan = Plans.objects.get_or_create(name='Free')[0]
    #     user_plan = UserPlan.objects.create(
    #         plan=default_free_plan,
    #         user=self.user,
    #         active=True
    #         )
    #     # user_plan.save()
    #     return

    def __str__(self):
        return self.user.username


# Business Information model extending user model
class BusinessInformation(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    corporate_name = models.CharField(max_length=50)
    business_as = models.CharField(max_length=50, blank=True)
    sic_code = models.CharField(max_length=20, blank=True)
    date_of_establishment = models.CharField(max_length=15, blank=True)
    type_of_ownership = models.CharField(max_length=100, blank=True)
    duns = models.CharField(max_length=20, blank=True)
    business_physical_address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=50, blank=True)
    state_code = models.CharField(max_length=50, blank=True, null=True)
    zip = models.CharField(max_length=10, blank=True)
    business_phone = models.CharField(max_length=20, blank=True)
    extenstion = models.CharField(max_length=20, blank=True)
    ein = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.user.username


# Personal Information model extending user model
class PersonalInformation(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    social_security_number = models.CharField(max_length=20, blank=True)
    home_address_1 = models.CharField(max_length=200, blank=True)
    home_address_2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=50, blank=True)
    state = models.CharField(max_length=50, blank=True)
    state_code = models.CharField(max_length=50, blank=True, null=True)
    zip = models.CharField(max_length=10, blank=True)
    total_monthly_income = models.CharField(max_length=50, blank=True)
    total_monthly_expenses = models.CharField(max_length=50, blank=True)
    birthday = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.user.username


# Financial Information model extending user model
class FinancialInformation(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    financing_type = models.CharField(max_length=100, blank=True)
    amount = models.CharField(max_length=100)
    finance = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username


# KPI Metrics model extending user model
class KpiMetrics(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    ytd_revenue = models.CharField(max_length=50, blank=True)
    ytd_profit = models.CharField(max_length=50, blank=True)
    current_ar = models.CharField(max_length=50, blank=True)
    current_ap = models.CharField(max_length=50, blank=True)
    current_bank_balance = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.user.username


# Loan History model with user model as Foreign Key
class LoanHistory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    date = models.CharField(max_length=15)
    loanAmount = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    outstandingBalance = models.CharField(max_length=50)
    paid = models.BooleanField()
    
    def __str__(self):
        return self.user.username


# Transactions model with user model as Foreign Key
class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    date = models.CharField(max_length=15)
    loanAmount = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    outstandingBalance = models.CharField(max_length=50)
    paid = models.BooleanField()

    def __str__(self):
        return self.user.username


class Plans(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    charges = models.FloatField(default=0.0)
    created_at = models.DateTimeField(
        editable=False, auto_now_add=True
    )
    active = models.BooleanField(default=True)


class UserPlan(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plans, models.CASCADE)
    subcribed_on = models.DateTimeField(
        editable=False, auto_now=True
    )
    active = models.BooleanField(default=True)


class UserPlanHistory(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plans, models.CASCADE)
    unsubscribed_on = models.DateTimeField(null=True, blank=True)


class UnderWriteDetails(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    id = models.CharField(primary_key=True,max_length=100)
    decision = models.CharField(max_length=100)
    score = models.CharField(max_length=100)
    status = models.BooleanField(default=False)


class UserDocumentation(models.Model):
    DocumentationTypes = [
        ("One Page Executive Summary", "executive_summary"),
        ("Business Plan", "business_plan"),
        ("Projected Financial Statements", "projected_financial_statements"),
        ("Pitch Deck", "pitch_deck"),
        ("Resume", "resume"),
        ("Other", "other")
    ]
    doc_type = models.CharField(max_length=50, choices=DocumentationTypes)
    path = models.FileField(upload_to="user_documentation/")
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="document_picture"
    )

    class Meta:
        db_table = "user_documentation"



@receiver(post_save, sender=UserProfile)
def assign_default_plan(sender, instance, **kwargs):
    if not getattr(instance.user, 'userplan', None):
        default_free_plan = Plans.objects.get_or_create(name='Free')[0]
        user_plan = UserPlan.objects.create(
            plan=default_free_plan,
            user_id=instance.user.id,
            active=True
            )
        user_plan.save()


