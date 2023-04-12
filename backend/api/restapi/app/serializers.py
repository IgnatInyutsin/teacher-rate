from rest_framework import serializers
from restapi.app.models import *


class ReviewSerializer(serializers.ModelSerializer):
    teacher = serializers.PrimaryKeyRelatedField(queryset=Teacher.objects.all())
    class Meta:
        model = Review
        fields = ("author", "title", "main_text", "grade", "teacher")
        read_only_fields = ("author",)

    # изменяем рейтинг преподавателя
    def create(self, validated_data):
        teacher = Teacher.objects.filter(id=validated_data.get("teacher").id)
        teacher.update(grade_mean=( teacher[0].grade_mean*teacher[0].grade_count + validated_data.get("grade")) / (teacher[0].grade_count+1),
                       grade_count=teacher[0].grade_count+1)
        return Review.objects.create(**validated_data)


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ("name", "city", "job_place", "photo", "grade_mean")


class FullTeacherSerializer(serializers.ModelSerializer):
    class TeacherReviewSerializer(serializers.ModelSerializer):
        class AuthorSerializer(serializers.ModelSerializer):
            class Meta:
                model = User
                fields = ("username", )

        author = AuthorSerializer()
        class Meta:
            model = Review
            fields = ("author", "title", "main_text", "grade", "teacher")

    reviews = TeacherReviewSerializer(many=True)
    class Meta:
        model = Teacher
        fields = "__all__"


class TeacherCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ("name", "description", "study_place", "job_place", "city", "photo")
