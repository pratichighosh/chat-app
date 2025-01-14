from django.urls import path
from .views import UserListView, UserRegistrationView, APIRootView

urlpatterns = [
    path('', APIRootView.as_view(), name='api-root'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
]