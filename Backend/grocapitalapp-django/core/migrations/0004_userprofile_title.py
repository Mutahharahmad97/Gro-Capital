# Generated by Django 3.1.7 on 2021-03-15 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_financialinformation_kpimetrics_personalinformation'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='title',
            field=models.CharField(default='Mr.', max_length=20),
            preserve_default=False,
        ),
    ]
