from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers


class CurrentUserSerializer(UserDetailsSerializer):
    """
    Add the profile_id and profile_image to fields returned 
    when requesting logged in user details
    """
    profile_id = serializers.ReadOnlyField(source='profile.id')
    profile_pic = serializers.ReadOnlyField(source='profile.profile_pic.url')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'profile_id', 'profile_pic'
        )
