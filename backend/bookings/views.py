from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated 
from .models import Room, Booking
from .serializers import RoomSerializer, BookingSerializer
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