from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets

from .serializers import *
from .models import *

def index(request):
    users = Persons.objects.all()
    output = ' <h1>Welcome to the Tool-Box homepage</h1>'
    output += 'This is a temporary welcome page'
    return HttpResponse(output)

# api
class PersonsViewSet(viewsets.ModelViewSet):
    """
    Returns a list of all __registered__ accounts in the system sorted by email address.
    """
    queryset = Persons.objects.all().order_by('email')
    serializer_class = PersonsSerializer

