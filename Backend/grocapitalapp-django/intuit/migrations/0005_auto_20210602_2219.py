# Generated by Django 3.1.7 on 2021-06-02 22:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('intuit', '0004_auto_20210601_2248'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuickbooksAssetLiabilitiesAndEquity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_bank_accounts', models.CharField(max_length=200)),
                ('total_other_current_assets', models.CharField(max_length=200)),
                ('total_current_assets', models.CharField(max_length=200)),
                ('total_fixed_assets', models.CharField(max_length=200)),
                ('total_assets', models.CharField(max_length=200)),
                ('accounts_payable', models.CharField(max_length=200)),
                ('total_accounts_payable', models.CharField(max_length=200)),
                ('total_other_current_liabilities', models.CharField(max_length=200)),
                ('total_current_liabilities', models.CharField(max_length=200)),
                ('total_long_term_liabilities', models.CharField(max_length=200)),
                ('total_liabilities', models.CharField(max_length=200)),
                ('total_equity', models.CharField(max_length=200)),
                ('total_liabilities_and_equity', models.CharField(max_length=200)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='quickbooksasset',
            name='user',
        ),
        migrations.DeleteModel(
            name='QuickbooksLiabilitiesAndEquity',
        ),
        migrations.DeleteModel(
            name='QuickbooksAsset',
        ),
    ]