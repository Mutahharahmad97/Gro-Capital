# Generated by Django 3.1.7 on 2021-06-01 22:47

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('intuit', '0002_auto_20210601_2245'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='QuickBooks_Assets',
            new_name='QuickBooks_Asset',
        ),
    ]
