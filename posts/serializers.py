from rest_framework import serializers
from posts.models import Post
from wishes.models import Wish
from likes.models import Like


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_pic = serializers.ReadOnlyField(
        source='owner.profile.profile_pic.url')
    like_id = serializers.SerializerMethodField()
    likes_count = serializers.ReadOnlyField()
    wish_id = serializers.SerializerMethodField()
    wishes_count = serializers.ReadOnlyField()
    comments_count = serializers.ReadOnlyField()

    def validate_image(self, value):
        """
        Image validation when user try to upload a image
        Raise error messages when image is larger than default
        """
        if value.size > 1024 * 1024 * 2:
            raise serializers.ValidationError(
                'Ops, for sure your trip was amazing, \
                but the image size is larger than 2MB!'
            )
        if value.image.height > 4096:
            raise serializers.ValidationError(
                'Ops, for sure your trip was amazing, \
                but the image height is larger than 4096px!'
            )
        if value.image.width > 4096:
            raise serializers.ValidationError(
                'Ops, for sure your trip was amazing, \
                but the image width is larger than 4096px!'
            )
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner

    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(
                owner=user, post=obj
            ).first()
            return like.id if like else None
        return None

    def get_wish_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            wish = Wish.objects.filter(
                owner=user, post=obj
            ).first()
            return wish.id if wish else None
        return None

    class Meta:
        model = Post
        fields = [
            'id', 'owner', 'is_owner', 'profile_id',
            'profile_pic', 'created_at', 'updated_at',
            'title', 'location', 'content', 'image',
            'trip_type', 'like_id', 'likes_count',
            'wish_id', 'wishes_count', 'comments_count',
        ]
