# Generated by Django 3.1.7 on 2021-07-08 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='FreshbooksProfitLoss',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=200)),
                ('currency_code', models.CharField(max_length=200)),
                ('end_date', models.CharField(max_length=200)),
                ('total_expenses', models.CharField(max_length=200)),
                ('total_income', models.CharField(max_length=200)),
            ],
        ),
    ]