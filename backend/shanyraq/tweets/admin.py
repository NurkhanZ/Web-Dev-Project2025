from django.contrib import admin
from .models import Property, Listing, Images, Favorites
# Register your models here.
admin.site.register(Property)
admin.site.register(Listing)
admin.site.register(Images)
admin.site.register(Favorites)
