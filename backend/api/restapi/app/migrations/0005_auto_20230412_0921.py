# Generated by Django 3.2.18 on 2023-04-12 09:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0004_alter_teacher_grade_mean'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews_owner', to=settings.AUTH_USER_MODEL, verbose_name='Рецензент'),
        ),
        migrations.AlterField(
            model_name='review',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='app.teacher', verbose_name='Учитель'),
        ),
    ]
