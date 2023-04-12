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


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    permission_classes = tuple()

    def retrieve(self, request, pk):
        return self.queryset.filter(pk=pk).get()
