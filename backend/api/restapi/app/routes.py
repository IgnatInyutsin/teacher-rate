from django.urls import include, path
from rest_framework import routers
from restapi.app.views import ReviewViewSet, TeacherViewSet

router = routers.DefaultRouter()
router.register('reviews', ReviewViewSet)
router.register('teachers', TeacherViewSet)

urlpatterns = [
    path('', include(router.urls))
]
