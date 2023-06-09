from rest_framework import viewsets, mixins, permissions
from restapi.app.serializers import *
from restapi.app.models import *
from restapi.app.permissions import IsFirstReview


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
    pagination_class = None

    def get_queryset(self):
        name = self.request.query_params.get("name", "")
        return Teacher.objects.filter(name__icontains=name)

    def get_serializer_class(self): # Разные методы - разные сериализаторы
        if self.action == "list":
            return TeacherSerializer
        elif self.action == "retrieve":
            return FullTeacherSerializer
        else:
            return TeacherCreateSerializer

    def get_permissions(self):
        if self.action == "create":
            self.permission_classes = (permissions.IsAuthenticated, IsFirstReview)
        self.permission_classes = (permissions.AllowAny, )
        return super().get_permissions()
