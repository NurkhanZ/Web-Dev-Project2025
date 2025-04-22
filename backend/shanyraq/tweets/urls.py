from django.urls import path
from .views import ListingList, ListingDetail
from .views import favorite_list, favorite_detail

urlpatterns = [
    path("listing/", ListingList.as_view()),
    path("listing/<int:id>/", ListingDetail.as_view()),
    path("favorites/", favorite_list),
    path("favorites/<int:id>/",  favorite_detail)
]
