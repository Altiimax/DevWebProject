from idlelib import query

from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import *
from .serializers import *


class personViewSet(viewsets.GenericViewSet):
    
    #127.0.0.1:8000/api/persons/all 
    @action(detail=False)
    def all(self, request, *args, **kwargs):
        """" list all users """
        queryset = Persons.objects.all().order_by('lastName')
        serializer = personsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    #127.0.0.1:8000/api/persons/aliases
    @action(detail=False)
    def aliases(self, request, *args, **kwargs):
        """" get all used aliases"""
        queryset = Persons.objects.all()
        serializer = aliasesSerializer(queryset, many=True)
        return Response(serializer.data)
    
    #127.0.0.1:8000/api/persons/byemail/?email=john.doe@gmail.com
    @action(detail=False)
    def byemail(self, request, *args, **kwargs):
        """" get user by its email"""
        email = request.query_params.get('email')
        queryset = Persons.objects.filter(email=email)
        print(queryset)
        if not queryset:
            error = "no user with this email: %s"%(email)
            return Response({'error': error})
        else:
            serializer = personsSerializer(queryset,many=True)
            return Response(serializer.data)

    #127.0.0.1:8000/api/persons/1/tools
    @action(detail=True, methods=['get'])
    def tools(self, request, pk=None, *args, **kwargs):
        queryset = Tools.objects.filter(id_person=pk)
        serializer = toolsSerializer(queryset, many=True)
        return Response(serializer.data)
