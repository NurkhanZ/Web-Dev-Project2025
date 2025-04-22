from django.db import models
from user.models import User


class Property(models.Model):
    # title = models.CharField(max_length=100)
    type = models.CharField(max_length=20)
    price = models.FloatField()
    area = models.FloatField()
    rooms_count = models.IntegerField()
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    description = models.TextField()
    parameters = models.JSONField()


class Images(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    url = models.TextField()


class Listing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    type = models.CharField(max_length=20)
    listing_date = models.DateField(auto_now_add=True)


class Favorites(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
