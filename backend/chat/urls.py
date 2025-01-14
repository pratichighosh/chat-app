from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
    path('', views.index, name='index'),
    path('room/<str:room_name>/', views.room, name='room'),
]

# backend/chat/views.py
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Message
from .serializers import UserSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(
            models.Q(sender=user) | models.Q(recipient=user)
        ).order_by('-timestamp')

    @action(detail=False, methods=['get'])
    def with_user(self, request):
        other_user_id = request.query_params.get('user_id')
        if other_user_id:
            messages = Message.objects.filter(
                (models.Q(sender=request.user) & models.Q(recipient_id=other_user_id)) |
                (models.Q(sender_id=other_user_id) & models.Q(recipient=request.user))
            ).order_by('timestamp')
            serializer = self.get_serializer(messages, many=True)
            return Response(serializer.data)
        return Response([])

def index(request):
    return render(request, 'chat/index.html')

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })