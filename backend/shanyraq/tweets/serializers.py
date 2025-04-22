from rest_framework import serializers
from .models import Property, Images, Listing, Favorites
from user.models import User

class ImageSerializer(serializers.Serializer):
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all(), write_only=True)
    url = serializers.CharField()

    def create(self, validated_data):
        return Images.objects.create(property=validated_data['property'], url=validated_data['url'])

    # class Meta:
    #     model = Images
    #     fields = '__all__'

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

    # title = serializers.CharField(max_length=100)
    # type = serializers.CharField(max_length=20)
    # price = serializers.FloatField()
    # area = serializers.FloatField()
    # rooms_count = serializers.IntegerField()
    # city = serializers.CharField(max_length=100)
    # address = serializers.CharField(max_length=100)
    # description = serializers.CharField()
    # parameters = serializers.JSONField()


    # def create(self, validated_data):
    #     property = Property.objects.create(**validated_data)
    #     return property

    # def update(self, instance, validated_data): 
    #     instance.title = validated_data.get('title', instance.title)
    #     instance.type = validated_data.get('type', instance.type)
    #     instance.price = validated_data.get('price', instance.price)
    #     instance.area = validated_data.get('area', instance.area)
    #     instance.rooms_count = validated_data.get('rooms_count', instance.rooms_count)
    #     instance.city = validated_data.get('city', instance.city)
    #     instance.address = validated_data.get('address', instance.address)
    #     instance.description = validated_data.get('description', instance.description)
    #     instance.parameters = validated_data.get('parameters', instance.parameters)
    #     instance.save()
    #     return instance


class ListingListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'

class ListingDetailSerializer(serializers.ModelSerializer):
    property = PropertySerializer()
    class Meta:
        model = Listing
        fields = '__all__'



class FavoritesSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    user_id = serializers.IntegerField()
    listing_id = serializers.IntegerField()

    def create(self, validated_data):
        user_id = validated_data.get('user_id')
        print("Received user_id:", user_id)  # Add this line for debugging

        listing_id = validated_data.get('listing_id')

        user = User.objects.get(id=user_id)

        favorite = Favorites.objects.create(
            user=user,
            listing_id=listing_id
        )
        return favorite