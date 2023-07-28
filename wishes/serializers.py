from django.db import IntegrityError
from rest_framework import serializers
from wishes.models import Wish


class WishSerializer(serializers.ModelSerializer):
    """
    Serializer for the Wish model
    The create method handles the unique constraint on 'owner' and 'post'
    """
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Wish
        fields = [
            'id', 'created_at', 'owner', 'post'
        ]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            """
            Error comes if user tries to like same post twice
            """
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
