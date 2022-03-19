# Generated by Django 3.1.7 on 2021-07-20 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20210720_1329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='personalinformation',
            name='personal_physical_address',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AlterField(
            model_name='personalinformation',
            name='social_security_number',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name='personalinformation',
            name='total_monthly_expenses',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='personalinformation',
            name='total_monthly_income',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]