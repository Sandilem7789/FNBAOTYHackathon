import csv
from django.core.management.base import BaseCommand
from core.models import Vendor, Garden, Produce

class Command(BaseCommand):
    help = 'Load vendors, gardens, and produce from CSV files without duplication'

    def handle(self, *args, **kwargs):
        self.load_vendors('vendors.csv')
        self.load_gardens('gardens.csv')
        self.load_produce('produce.csv')

    def load_vendors(self, filepath):
        try:
            with open(filepath, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    vendor, created = Vendor.objects.get_or_create(
                        name=row['name'],
                        defaults={
                            'business_type': row['business_type'],
                            'location': row['location'],
                            'phone_number': row['phone_number'],
                            'latitude': row.get('latitude'),
                            'longitude': row.get('longitude')
                        }
                    )
                    if created:
                        self.stdout.write(self.style.SUCCESS(f"✅ Vendor created: {vendor.name}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"⚠️ Vendor already exists: {vendor.name}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error loading vendors: {e}'))

    def load_gardens(self, filepath):
        try:
            with open(filepath, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    garden, created = Garden.objects.get_or_create(
                        name=row['name'],
                        defaults={
                            'location': row['location'],
                            'contact_person': row['contact_person'],
                            'phone_number': row['phone_number'],
                            'latitude': row.get('latitude'),
                            'longitude': row.get('longitude'),
                            'image': row.get('image'),
                            'owner_id': row.get('owner_id')
                        }
                    )
                    if created:
                        self.stdout.write(self.style.SUCCESS(f"✅ Garden created: {garden.name}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"⚠️ Garden already exists: {garden.name}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error loading gardens: {e}'))

    def load_produce(self, filepath):
        try:
            with open(filepath, newline='', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    garden = None
                    if 'garden_id' in row:
                        garden = Garden.objects.filter(id=row['garden_id']).first()
                    elif 'garden' in row:
                        garden = Garden.objects.filter(name=row['garden']).first()

                    if not garden:
                        self.stdout.write(self.style.WARNING(f'⚠️ Garden not found for row: {row}'))
                        continue

                    if Produce.objects.filter(name=row['name'], garden=garden).exists():
                        self.stdout.write(self.style.WARNING(f"⚠️ Produce already exists: {row['name']} in {garden.name}"))
                        continue

                    try:
                        Produce.objects.create(
                            name=row['name'],
                            quantity=int(row['quantity']),
                            unit=row.get('unit', 'kg'),
                            weight=float(row.get('weight', 0)),
                            price=float(row.get('price', 0)),
                            image=row.get('image'),
                            garden=garden
                        )
                        self.stdout.write(self.style.SUCCESS(f"✅ Produce created: {row['name']} in {garden.name}"))
                    except Exception as e:
                        self.stdout.write(self.style.WARNING(f'⚠️ Error creating produce {row.get("name")}: {e}'))

            self.stdout.write(self.style.SUCCESS('✅ Produce loaded successfully.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'❌ Error loading produce: {e}'))
