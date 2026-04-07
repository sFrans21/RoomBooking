from django.db import models
from django.contrib.auth.models import User

class Room(models.Model):
    name = models.CharField(max_length=100)
    capacity = models.PositiveIntegerField()

    def __str__(self):
        return self.name

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='bookings')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-start_time']

    def __str__(self):
        return f"{self.room.name} - {self.user.username}"