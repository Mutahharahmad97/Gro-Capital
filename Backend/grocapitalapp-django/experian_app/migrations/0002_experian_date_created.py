# Generated by Django 3.1.7 on 2021-09-24 21:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('experian_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='experian',
            name='date_created',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
