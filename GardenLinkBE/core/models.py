from django.db import models

# Garden Model
class Garden(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    image = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name

# Produce Model
class Produce(models.Model):
    name = models.CharField(max_length=100)
    garden = models.ForeignKey('Garden', on_delete=models.CASCADE, related_name='produce')
    image = models.URLField(null=True, blank=True)
    quantity = models.PositiveIntegerField(default=10)
    unit = models.CharField(max_length=20, default="kg")


    def __str__(self):
        return f"{self.name} ({self.quantity} {self.unit})"

# Vendor Model
class Vendor(models.Model):
    name = models.CharField(max_length=100)
    business_type = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return self.name
    
# Order Model
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('collected', 'Collected'),
    ]

    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} by {self.vendor.name}"
    
# OrderItem Model
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    produce = models.ForeignKey(Produce, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} of {self.produce.name} (Order #{self.order.id})"