# Generated by Django 4.2.4 on 2023-09-15 02:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Test',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=2)),
            ],
            options={
                'db_table': 'test',
                'managed': False,
            },
        ),
    ]
