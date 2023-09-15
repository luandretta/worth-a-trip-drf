from rest_framework import serializers
from .models import Messenger


class MessengerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Messenger model
    The currently logged in user will be used as the sender of the message
    """
    sender = serializers.ReadOnlyField(source='sender.username')
    is_sender = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='sender.profile.id')
    profile_image = serializers.ReadOnlyField(
        source='sender.profile.profile_pic.url'
    )

    def get_is_sender(self, obj):
        request = self.context['request']
        return request.user == obj.sender

    class Meta:
        model = Messenger
        fields = [
            'id', 'sender', 'is_sender', 'created_at', 'updated_at',
            'profile_id', 'profile_pic', 'receiver', 'content',
        ]


class MessengerDetailSerializer(MessengerSerializer):
    """
    Serializer for the Messenger model used in Detail view
    Messenger is a ReadOnlyField so that the permissions doesn't have to be
    setet on each update
    """
    messenger = serializers.ReadOnlyField(source='messenger.id')
