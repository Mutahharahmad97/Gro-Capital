# Generated by Django 3.1.7 on 2021-08-26 22:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_personalinformation_birthday'),
    ]

    operations = [
        migrations.AddField(
            model_name='businessinformation',
            name='ein',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]