# Generated by Django 3.1.7 on 2021-12-03 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crs_app', '0002_crs_consumer_credit_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='crs',
            name='business_credit_score',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]