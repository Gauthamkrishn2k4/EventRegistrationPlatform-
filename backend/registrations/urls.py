from django.urls import path
from .views import register_for_event, my_registrations

urlpatterns = [
    path('', register_for_event),
    path('<str:username>/', my_registrations),
]