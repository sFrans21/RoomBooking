from rest_framework import serializers
from django.utils import timezone
from .models import Room, Booking

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'capacity']


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'user', 'room', 'start_time', 'end_time', 'created_at']
        read_only_fields = ['user', 'created_at'] 

    def validate(self, data):
        if data['end_time'] <= data['start_time']:
            raise serializers.ValidationError("Waktu selesai harus lebih besar dari waktu mulai.")

        if data['start_time'] < timezone.now():
            raise serializers.ValidationError("Pemesanan tidak dapat dilakukan di masa lampau.")


        conflicting_bookings = Booking.objects.filter(
            room=data['room'],
            start_time__lt=data['end_time'],
            end_time__gt=data['start_time']
        )

        if conflicting_bookings.exists():
            raise serializers.ValidationError("Ruangan sudah dipesan pada rentang waktu tersebut.")

        return data