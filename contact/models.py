from django.db import models
from django.contrib.auth.models import User


class ContactForm(models.Model):
    """
    Contact form model, related to User
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=55)
    message = models.TextField(max_length=255)
    created_date = models.DateTimeField(auto_now=True)
    updated_date = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_date"]

    def __str__(self):
        return f"{self.owner} : {self.subject}"
