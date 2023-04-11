from django.contrib import admin
from .models import Teacher, Review


@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ("name", "job_place", "grade_mean", "grade_count")


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ("__str__", "title", "grade")
