from rest_framework import permissions
from restapi.app.models import Review
class IsFirstReview(permissions.BasePermission):
    """
    Право читать чат только его членам
    """

    def has_permission(self, request, view):
        user = request.user
        return len(Review.objects.filter(author=user)) < 1