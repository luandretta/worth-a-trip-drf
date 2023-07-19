from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    """
    Post model, related to 'owner', i.e. a User instance.
    Owner can create/retrieve/update or delete
    Image is required to post something
    Offer options of trip type
    """
    trip_type_choices = [
        ('adventure', 'Adventure'),
        ('relax', 'Relax'),
        ('romantic', 'Romantic'),
        ('cultural', 'Cultural'),
        ('consumption', 'Consumption'),
        ('nautical', 'Nautical'),
        ('gastronomic', 'Gastronomic'),
        ('religious', 'Religious'),
        ('other', 'Other'),
    ]

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(
        max_length=120, null=False, blank=False, default=''
    )
    location = models.CharField(
        max_length=40, null=False, blank=False,
    )
    content = models.TextField(
        blank=True, null=False, default=''
    )
    image = models.ImageField(
        upload_to='images/', default='', blank=False
    )
    trip_type = models.CharField(
        max_length=30, choices=trip_type_choices,
        null=True, blank=False, default=''
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.title}'
