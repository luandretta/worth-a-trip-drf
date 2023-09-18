from django.contrib.humanize.templatetags.humanize import naturaltime
from rest_framework import serializers
from .models import ContactForm


class ContactFormSerializer(serializers.ModelSerializer):
    """
    Serializer for the ContactForm model
    """
    owner = serializers.ReadOnlyField(source='owner.username')
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_pic = serializers.ReadOnlyField(
        source='owner.profile.profile_pic.url')
    created_at = serializers.SerializerMethodField()
    updated_at = serializers.SerializerMethodField()

    def get_created_date(self, obj):
        """
        Displays the created date of the message
        """
        return naturaltime(obj.created_at)

    def get_updated_at(self, obj):
        """
        Displays the last updated date of the message
        """
        return naturaltime(obj.updated_at)

    class Meta:
        """
        Specify fields from ContactForm model
        """
        model = ContactForm
        fields = [
            'id', 'owner', 'subject', 'message',
            'profile_id', 'profile_pic', 'created_at',
            'updated_at',
        ]
