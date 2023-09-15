from django.db import models
from django.contrib.auth.models import User


class Messenger(models.Model):
    """
    Model related to owner/user for sender and receiver fields
    Use related_name to distinguish between the two
    """
    sender = models.ForeignKey(
        User, related_name='sent_messages', on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        User, related_name='received_messages', on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    content = models.TextField

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.owner} : {self.content}'
