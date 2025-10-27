from rest_framework import serializers
from .models import (
    Garden,
    Produce,
    Vendor,
    Order,
    OrderItem   
)

# Produce Serializer
class ProduceSerializer(serializers.ModelSerializer):
    garden_name = serializers.CharField(source='garden.name', read_only=True)

    class Meta:
        model = Produce
        fields = ['id', 'name', 'quantity', 'unit', 'weight', 'price', 'image', 'garden_name']

# Garden Serializer
class GardenSerializer(serializers.ModelSerializer):
    produce = ProduceSerializer(many=True, read_only=True)

    class Meta:
        model = Garden
        fields = '__all__'

# Vendor Serializer        
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

# Order Serializer
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        
# Order Item Serializer
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'