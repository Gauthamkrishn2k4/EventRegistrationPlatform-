from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from events.models import Event
from .models import Registration


@api_view(['POST'])
def register_for_event(request):
    username = request.data.get('username')
    event_id = request.data.get('event_id')

    try:
        user = User.objects.get(username=username)
        event = Event.objects.get(id=event_id)
    except:
        return Response(
            {"error": "User or Event not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if Registration.objects.filter(
        user=user,
        event=event
    ).exists():
        return Response(
            {"error": "Already registered"},
            status=status.HTTP_400_BAD_REQUEST
        )

    Registration.objects.create(
        user=user,
        event=event
    )

    return Response(
        {"message": "Registration successful"},
        status=status.HTTP_201_CREATED
    )


@api_view(['GET'])
def my_registrations(request, username):

    registrations = Registration.objects.filter(
        user__username=username
    )

    data = []

    for registration in registrations:
        data.append({
            "event": registration.event.title,
            "location": registration.event.location,
            "date": registration.event.date
        })

    return Response(data)