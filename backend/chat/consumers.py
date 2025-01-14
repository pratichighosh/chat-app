import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.room_group_name = f'chat_{self.user.id}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        recipient_id = data['recipient']

        # Save message to database
        await self.save_message(message, recipient_id)

        # Send message to recipient's group
        await self.channel_layer.group_send(
            f'chat_{recipient_id}',
            {
                'type': 'chat_message',
                'message': message,
                'sender': self.user.id
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'sender': event['sender']
        }))

    @database_sync_to_async
    def save_message(self, content, recipient_id):
        Message.objects.create(
            sender=self.user,
            recipient_id=recipient_id,
            content=content
        )