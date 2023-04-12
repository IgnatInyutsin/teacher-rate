from rest_framework import viewsets, mixins, permissions
from restapi.app.serializers import *
from restapi.app.models import *

class ReviewViewSet(mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # добавляем рецезента в сериализатор
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class TeacherViewSet(mixins.CreateModelMixin,
                     viewsets.GenericViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherCreateSerializer
    permission_classes = (permissions.IsAuthenticated,)