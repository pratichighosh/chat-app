from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    # Add any additional fields you need
    bio = models.TextField(max_length=500, blank=True)
    
    # Add other custom fields as needed
    
    def __str__(self):
        return self.username