from django.urls import path
from messenger import views

urlpatterns = [
    path('messenger/', views.MessengerList.as_view()),
    path('messenger/<int:pk>/', views.MessengerDetail.as_view()),
]
