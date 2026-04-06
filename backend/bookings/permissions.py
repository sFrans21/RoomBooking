from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Izin kustom: Hanya pemilik pemesanan yang bisa menghapus.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user