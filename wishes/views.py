from rest_framework import generics, permissions
from drf_api.permissions import IsOwnerOrReadOnly
from wishes.models import Wish
from wishes.serializers import WishSerializer


class WishList(generics.ListCreateAPIView):
    """
    Wish List or create a wish if logged in
    The perfom_create method associates the wish with the logged in user
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = WishSerializer
    queryset = Wish.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class WishDetail(generics.RetrieveDestroyAPIView):
    """
    Retrieve a wish or delete it by id if you own it
    No update view, as users can only wish or not the trip
    Destroy a wish if owner of that wish
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = WishSerializer
    queryset = Wish.objects.all()
