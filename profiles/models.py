from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    """
    Profile Model, each User can have only one Profile
    Fields: user, name, bio, created_at, updated_at, profile picture,
    background picture, location, date of birth
    """
    owner = models.OneToOneField(
        User,
        primary_key=True,
        verbose_name='owner',
        on_delete=models.CASCADE)
    name = models.CharField(
        'Name:',
        max_length=30,
        blank=True,
        null=True)
    bio = models.TextField('Bio (max 150 characters):',
                           max_length=150,
                           blank=True,
                           null=True,)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    profile_pic = models.ImageField(
        upload_to='images/',
        default='../default_profile')
    bg_pic = models.ImageField(
        upload_to='images/',
        default='../default_bg')
    birth_date = models.DateField(
        'Birthday (YYYY-MM-DD)',
        null=True,
        blank=True)
    location = models.Charfiels(
        'Location',
        max_length=30,
        blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner}'s profile"
