from django.db import models
from django.contrib.auth.models import User
from posts.models import Post


class Wish(models.Model):
    owner = models.ForeignKey(User, on_delete=CASCADE)
    post = models.ForeignKey(Post, related_name='wishes', on_delete=CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'post']

    def __str__(self):
        return f'{self.owner} {self.post}'
