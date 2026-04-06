from django.contrib.auth.models import User # TAMBAHKAN INI
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny 
from .models import Room, Booking
from .serializers import RoomSerializer, BookingSerializer, UserRegisterSerializer
from .permissions import IsOwner

class RoomListCreateView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class BookingListCreateView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user_id = self.request.query_params.get('user')
        if user_id:
            return Booking.objects.filter(user_id=user_id)
        return Booking.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookingDetailDestroyView(generics.RetrieveDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated, IsOwner]
    
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny] # Siapa saja boleh daftar
    serializer_class = UserRegisterSerializer