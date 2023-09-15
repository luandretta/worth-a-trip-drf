from rest_framework import generics, permissions, filters
from django.db.models import Q
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Messenger
from .serializers import MessengerSerializer


class MessengerList(generics.ListCreateAPIView):
    """
    List all user messages or create a message if logged in
    The perform_create method associates the message with the logged in user
    """
    serializer_class = MessengerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Messenger.objects.all().order_by('-created_at')

    def get_queryset(self):
        """
        Return only objects, where the current user is either
        sender or receiver
        """
        messenger = Messenger.objects.filter(
            Q(sender=self.request.user.id) | Q(receiver=self.request.user.id)
        )
        return messenger

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)


class MessengerDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Current user can retrieve, update or delete his messages
    """
    serializer_class = MessengerSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Messenger.objects.order_by('-created_at')
