# Generated by Django 3.2.20 on 2023-09-20 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0003_auto_20230919_1322'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='infrastructure',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='local_access',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='local_population',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='local_security',
            field=models.IntegerField(),
        ),
    ]