# Generated by Django 3.1.3 on 2020-11-25 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='slugTitle',
            field=models.SlugField(default='djangodbmodelsfieldscharfield', max_length=150),
        ),
    ]