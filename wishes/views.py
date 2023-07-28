from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from wishes.models import Wish
from wishes.serializers import WishSerializer


class WishList(generics.ListCreateAPIView):
    """
    Wish List or create a wish if logged in
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = WishSerializer
    queryset = Wish.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WishDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a wish or delete it by id if you own it
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = WishSerializer
    queryset = Wish.objects.all()
