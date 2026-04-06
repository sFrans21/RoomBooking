
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), # Koreksi di sini
    path('api/', include('bookings.urls')),
]
