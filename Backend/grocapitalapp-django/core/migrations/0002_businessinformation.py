# Generated by Django 3.1.7 on 2021-03-12 15:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BusinessInformation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('corporate_name', models.CharField(max_length=50)),
                ('business_as', models.CharField(max_length=50)),
                ('sic_code', models.CharField(max_length=20)),
                ('date_of_establishment', models.CharField(max_length=15)),
                ('type_of_ownership', models.CharField(max_length=100)),
                ('duns', models.CharField(max_length=20)),
                ('physical_address', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=50)),
                ('state', models.CharField(max_length=50)),
                ('zip', models.CharField(max_length=10)),
                ('business_phone', models.CharField(max_length=20)),
                ('extenstion', models.CharField(max_length=20)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]