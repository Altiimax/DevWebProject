from django.shortcuts import render
from django.http import HttpResponse

from .models import Persons

def index(request):
    users = Persons.objects.all()
    output = ', '.join([q.lastname for q in users])
    return HttpResponse(output)
