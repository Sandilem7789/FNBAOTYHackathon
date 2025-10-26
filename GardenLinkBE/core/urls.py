from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GardenViewSet,
    ProduceViewSet,
    VendorViewSet,
    OrderViewSet
)
from rest_framework.authtoken.views import obtain_auth_token

router = DefaultRouter()
router.register(r'gardens', GardenViewSet)
router.register(r'produce', ProduceViewSet)
router.register(r'vendors', VendorViewSet)
router.register(r'orders', OrderViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', obtain_auth_token),
]
