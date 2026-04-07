from django.contrib.auth.models import User 
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny 
from .models import Room, Booking
from .serializers import RoomSerializer, BookingSerializer, UserRegisterSerializer
from .permissions import IsOwner
from django.utils.dateparse import parse_date 
from datetime import datetime, time

class RoomListCreateView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Booking.objects.filter(user=user)
        
        date_str = self.request.query_params.get('date')
        if date_str:
            target_date = parse_date(date_str)
            if target_date:
                start_of_day = datetime.combine(target_date, time.min)
                end_of_day = datetime.combine(target_date, time.max)
                queryset = queryset.filter(start_time__range=(start_of_day, end_of_day))
        return queryset.order_by('-start_time')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookingDetailDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer