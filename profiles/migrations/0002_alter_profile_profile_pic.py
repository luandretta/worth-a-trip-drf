# Generated by Django 3.2.20 on 2023-09-15 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_pic',
            field=models.ImageField(default='../default_profile_xyqpyl', upload_to='images/'),
        ),
    ]
