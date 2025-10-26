from django.contrib import admin
from .models import (
    Garden,
    Produce,
    Vendor,
    Order
)


admin.site.register(Garden)
admin.site.register(Produce)
admin.site.register(Vendor)
admin.site.register(Order)