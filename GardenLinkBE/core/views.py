from rest_framework import viewsets
from rest_framework.authtoken.views import obtain_auth_token
from .models import (
    Garden,
    Produce,
    Vendor,
    Order,
    OrderItem
)
from .serializers import (
    GardenSerializer,
    ProduceSerializer,
    VendorSerializer,
    OrderSerializer,
    OrderItemSerializer
)

# Garden ViewSet
class GardenViewSet(viewsets.ModelViewSet):
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer

# Produce ViewSet
class ProduceViewSet(viewsets.ModelViewSet):
    queryset = Produce.objects.all()
    serializer_class = ProduceSerializer

# Vendor ViewSet
class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

# Order ViewSet
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# OrderItem ViewSet
class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer