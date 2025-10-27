from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    GardenViewSet,
    ProduceViewSet,
    VendorViewSet,
    OrderViewSet,
    gardener_produce
)
from rest_framework.authtoken.views import obtain_auth_token
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'gardens', GardenViewSet)
router.register(r'produce', ProduceViewSet, basename='produce')
router.register(r'vendors', VendorViewSet)
router.register(r'orders', OrderViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('api/login/', obtain_auth_token),
    path('api/gardener/produce/', gardener_produce),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
from .views import garden_produce

urlpatterns += [
    path('gardens/<int:garden_id>/produce/', garden_produce, name='garden-produce'),
]

