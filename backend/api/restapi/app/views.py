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
                     mixins.ListModelMixin,
                     mixins.RetrieveModelMixin,
                     viewsets.GenericViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_serializer_class(self): # Разные методы - разные сериализаторы
        if self.action == "list":
            return TeacherSerializer
        elif self.action == "retrieve":
            return TeacherSerializer
        else:
            return TeacherCreateSerializer
