from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Garden, Produce, Vendor, Order, OrderItem
from .serializers import GardenSerializer, ProduceSerializer, VendorSerializer, OrderSerializer, OrderItemSerializer

# 🌱 Garden ViewSet
class GardenViewSet(viewsets.ModelViewSet):
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Garden.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# 🥕 Produce ViewSet
class ProduceViewSet(viewsets.ModelViewSet):
    serializer_class = ProduceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Produce.objects.filter(garden__owner=self.request.user)

# 🛒 Vendor ViewSet
class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

# 📦 Order ViewSet
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

# 📦 OrderItem ViewSet
class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemSerializer

# 🌿 Custom Endpoint: Produce by Garden ID
@api_view(['GET'])
def garden_produce(request, garden_id):
    try:
        garden = Garden.objects.get(id=garden_id)
    except Garden.DoesNotExist:
        return Response({'error': 'Garden not found'}, status=404)

    produce = garden.produce.all()
    serializer = ProduceSerializer(produce, many=True)
    return Response(serializer.data)

# 🌿 Custom Endpoint: Produce for Logged-in Gardener
@api_view(['GET'])
def gardener_produce(request):
    user = request.user
    gardens = Garden.objects.filter(owner=user)
    produce = Produce.objects.filter(garden__in=gardens)
    serializer = ProduceSerializer(produce, many=True)
    return Response(serializer.data)

# 🔐 Fixed Custom Login Endpoint
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    print("✅ Custom login view hit")
    print(f"🔍 Attempting login for: {username}")

    user = authenticate(username=username, password=password)
    print(f"Result of authenticate: {user}")

    if user is None:
        print("❌ Authentication failed")
        return Response({'detail': 'Invalid credentials'}, status=401)

    print("✅ Authentication succeeded")
    token, _ = Token.objects.get_or_create(user=user)

    vendor_id = getattr(user.vendor, 'id', None) if hasattr(user, 'vendor') else None
    garden = Garden.objects.filter(owner=user).first()
    gardener_id = garden.id if garden else None

    return Response({
        'token': token.key,
        'vendor_id': vendor_id,
        'gardener_id': gardener_id,
    })
