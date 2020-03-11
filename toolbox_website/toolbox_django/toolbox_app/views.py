from django.shortcuts import render
from django.http import HttpResponse

from .models import *

def index(request):
    #users = Persons.objects.all()
    output = ' <h1>Welcome to the Tool-Box homepage</h1>'
    output += 'This is a temporary welcome page'
    return HttpResponse(output)

