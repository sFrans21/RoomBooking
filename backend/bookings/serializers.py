from django.contrib.auth.models import User 
from rest_framework import serializers
from django.utils import timezone
from .models import Room, Booking

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'capacity']


class BookingSerializer(serializers.ModelSerializer):
    room_name = serializers.SerializerMethodField()
    class Meta:
        model = Booking
        fields = ['id', 'user', 'room', 'room_name', 'start_time', 'end_time', 'created_at']
        read_only_fields = ['user', 'created_at'] 

    def get_room_name(self, obj):
        if obj.room:
            return obj.room.name
        return "Ruangan Terhapus"

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

        if self.instance:
            conflicting_bookings = conflicting_bookings.exclude(id=self.instance.id)

        if conflicting_bookings.exists():
            raise serializers.ValidationError("Ruangan sudah dipesan pada rentang waktu tersebut.")

        return data
    
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'email']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user