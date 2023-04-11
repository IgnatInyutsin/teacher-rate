from django.urls import include, path
from rest_framework import routers
from restapi.app.views import ReviewViewSet

router = routers.DefaultRouter()
router.register('reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls))
]