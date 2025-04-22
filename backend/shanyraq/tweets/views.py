from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from user.models import User
from .models import Property, Listing, Images, Favorites
from .serializers import PropertySerializer, ImageSerializer, ListingListSerializer, ListingDetailSerializer,FavoritesSerializer


class ListingList(APIView):
    def get(self, request):
        listings = Listing.objects.all()
        listing_serializer = ListingDetailSerializer(listings, many=True)

        for listing_data in listing_serializer.data:

            property_id = listing_data['property']['id']
            images = Images.objects.filter(property_id=property_id)
            image_serializer = ImageSerializer(images, many=True)
            listing_data['property']['images'] = image_serializer.data

        return Response(listing_serializer.data)

    def post(self, request):
        
        request.data.pop('id')
        request.data.get('property').pop('id')
        property_data = request.data.get('property')
        images = property_data.pop('images')
        print(request.data)
        property_serializer = PropertySerializer(data=property_data)

        if property_serializer.is_valid():
            property = property_serializer.save()
            request.data['property'] = property.id # type: ignore

            image_data_list = [{'property': property.id, 'url': url} for url in images] # type: ignore
            image_serializer = ImageSerializer(data=image_data_list, many=True)
            if image_serializer.is_valid():
                image_serializer.save()
            else:
                print(property_serializer.errors)
                return Response({'image_errors': image_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            
            listing_serializer = ListingListSerializer(data=request.data)
            if listing_serializer.is_valid():
                listing = listing_serializer.save(property=property)
                return Response(ListingListSerializer(listing).data, status=status.HTTP_201_CREATED)
            
            # print(property_serializer.errors)

            return Response({'listing_errors': listing_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        # print(property_serializer.errors)
        
        return Response({'property_errors': property_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ListingDetail(APIView):
    def get_object(self, id):
        try:
            return Listing.objects.get(id=id)
        except Listing.DoesNotExist:
            return None

    def get(self, request, id):
        listing = self.get_object(id)
        if listing is None:
            return Response({'error': "listing not found"}, status=status.HTTP_404_NOT_FOUND)
        
        listing_serializer = ListingDetailSerializer(listing)

        property_id = listing_serializer.data['property']['id'] # type: ignore
        images = Images.objects.filter(property_id=property_id)
        image_serializer = ImageSerializer(images, many=True)
        listing_serializer.data['property']['images'] = image_serializer.data # type: ignore

        return Response(listing_serializer.data)
    
    def put(self, request, id):
        listing = self.get_object(id)
        if listing is None:
            return Response({'error: listing is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PropertySerializer(instance=listing.property, data=request.data.get('property'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        listing = self.get_object(id)
        if listing is None:
            return Response({'error: listing is not found'}, status=status.HTTP_404_NOT_FOUND)
        
        listing.delete()
        return Response({'deleted': True})
    

@api_view(['POST'])
def favorite_list(request):
    if request.method == 'POST':
        print(request.data)
        serializer = FavoritesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'DELETE'])
def favorite_detail(request, id=None):
    if request.method == 'GET':
        fav2 = Favorites.objects.all()
        print("ALL: ", fav2)

        favorites = Favorites.objects.filter(user=id)
        serializer = FavoritesSerializer(favorites, many=True)
        
        print("Filtered", serializer.data)
        return Response(serializer.data)
    
    elif request.method == 'DELETE':
        try:
            favorite = Favorites.objects.get(id=id)
            favorite.delete()
            return Response({'deleted': True})
        except Favorites.DoesNotExist:
            return Response({'error': 'Favorite not found'}, status=404)
