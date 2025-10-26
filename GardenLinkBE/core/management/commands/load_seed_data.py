import csv
from django.core.management.base import BaseCommand
from core.models import Vendor, Garden, Produce

class Command(BaseCommand):
    help = 'Load vendors, gardens, and produce from CSV files'

    def handle(self, *args, **kwargs):
        self.load_vendors('vendors.csv')
        self.load_gardens('gardens.csv')
        self.load_produce('produce.csv')

    def load_vendors(self, filepath):
        try:
            with open(filepath, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    Vendor.objects.create(
                        name=row['name'],
                        business_type=row['business_type'],
                        location=row['location'],
                        phone_number=row['phone_number'],
                        latitude=row.get('latitude'),
                        longitude=row.get('longitude')
                    )
            self.stdout.write(self.style.SUCCESS('✅ Vendors loaded successfully.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error loading vendors: {e}'))

    def load_gardens(self, filepath):
        try:
            with open(filepath, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    Garden.objects.create(
                        name=row['name'],
                        location=row['location'],
                        contact_person=row['contact_person'],
                        phone_number=row['phone_number'],
                        latitude=row.get('latitude'),
                        longitude=row.get('longitude'),
                        image=row.get('image')
                    )
            self.stdout.write(self.style.SUCCESS('✅ Gardens loaded successfully.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error loading gardens: {e}'))

    def load_produce(self, filepath):
        try:
            with open(filepath, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    garden_name = row['garden']
                    garden = Garden.objects.filter(name=garden_name).first()
                    if garden:
                        Produce.objects.create(
                            name=row['name'],
                            quantity=row['quantity'],
                            unit=row['unit'],
                            garden=garden,
                            image=row.get('image')
                        )
                    else:
                        self.stdout.write(self.style.WARNING(f'⚠️ Garden not found: {garden_name}'))
            self.stdout.write(self.style.SUCCESS('✅ Produce loaded successfully.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error loading produce: {e}'))
