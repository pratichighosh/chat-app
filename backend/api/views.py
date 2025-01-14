from rest_framework import generics
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse

User = get_user_model()  # This gets the proper User model

class APIRootView(APIView):
    def get(self, request, format=None):
        return Response({
            'users': reverse('api:user-list', request=request, format=format),
        })

class UserListView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer