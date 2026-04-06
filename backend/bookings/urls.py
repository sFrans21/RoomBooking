from django.urls import path
from .views import RoomListCreateView, BookingListCreateView, BookingDetailDestroyView

urlpatterns = [
    path('rooms/', RoomListCreateView.as_view(), name='room-list-create'),
    path('bookings/', BookingListCreateView.as_view(), name='booking-list-create'),
    path('bookings/<int:pk>/', BookingDetailDestroyView.as_view(), name='booking-detail-destroy'),
]