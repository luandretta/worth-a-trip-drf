from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    """
    Serializer for the Message model
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
        model = Message
        fields = [
            'id', 'sender', 'is_sender', 'created_at', 'updated_at',
            'profile_id', 'profile_pic', 'receiver', 'content',
        ]


class MessageDetailSerializer(MessageSerializer):
    """
    Serializer for the Message model used in Detail view
    Message is a ReadOnlyField so that the permissions doesn't have to be
    setet on each update
    """
    message = serializers.ReadOnlyField(source='message.id')
