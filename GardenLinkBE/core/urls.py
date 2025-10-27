from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    GardenViewSet,
    ProduceViewSet,
    VendorViewSet,
    OrderViewSet,
    gardener_produce,
    garden_produce,
    login_view  # ✅ Custom login view
)

# 🌱 Register ViewSets
router = DefaultRouter()
router.register(r'gardens', GardenViewSet)
router.register(r'produce', ProduceViewSet, basename='produce')
router.register(r'vendors', VendorViewSet)
router.register(r'orders', OrderViewSet)

# 🌿 Define URL patterns
urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='custom-login'),  # ✅ Replaces obtain_auth_token
    path('gardener/produce/', gardener_produce, name='gardener-produce'),
    path('gardens/<int:garden_id>/produce/', garden_produce, name='garden-produce'),
]

# 📦 Serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
