# Generated by Django 3.1.7 on 2021-09-24 21:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('experian_app', '0002_experian_date_created'),
    ]

    operations = [
        migrations.RenameField(
            model_name='experian',
            old_name='business_information',
            new_name='business_score',
        ),
    ]