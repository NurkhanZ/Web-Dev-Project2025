from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    password = models.CharField(max_length=100)
    contact_info = models.CharField(max_length=20, unique=True)

    USERNAME_FIELD = 'contact_info'
    REQUIRED_FIELDS = ['username', 'password']
