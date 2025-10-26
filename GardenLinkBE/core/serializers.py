from rest_framework import serializers
from .models import (
    Garden,
    Produce,
    Vendor,
    Order,
    OrderItem   
)

# Garden Serializer
class GardenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Garden
        fields = '__all__'

# Produce Serializer
class ProduceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produce
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