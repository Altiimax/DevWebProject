from django.shortcuts import render
from django.http import HttpResponse

from .models import Persons

def index(request):
    users = Persons.objects.all()
    output = ' <h1>GEO Tools</h1>'
    output += '<table><tr><th>LastName</th><th>FirstName</th><th>Alias</th><th>Email</th></tr>'
    for u in users:
        output += '<tr><td>%s</td><td>%s</td><td>%s</td><td>%s</td></tr>' %(u.lastname,u.firstname,u.alias,u.email)
    output += '</table>'
    return HttpResponse(output)
