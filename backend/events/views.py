from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Event


@api_view(['GET'])
def get_events(request):
    events = Event.objects.all()

    data = []

    for event in events:
        data.append({
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "date": event.date,
            "location": event.location
        })

    return Response(data)