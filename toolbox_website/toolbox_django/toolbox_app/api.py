from idlelib import query

from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import *
from .serializers import *


class personViewSet(viewsets.GenericViewSet):
    #queryset = Persons.objects.all().order_by('lastName')
    #serializer_class = personsSerializer


    #@detail_route(methods=['get'])
    #detail
    @action(detail=True, url_path='alias')
    def getAlias(self, request, *args, **kwargs):
        return Response({'alias': self.alias})

    #127.0.0.1:8000/api/persons/all 
    @action(detail=False)
    def all(self, request, *args, **kwargs):
        """" List all users """
        queryset = Persons.objects.all().order_by('lastName')
        serializer = personsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    #127.0.0.1:8000/api/persons/byemail/?email=john.doe@gmail.com
    @action(detail=False)
    def byemail(self, request, *args, **kwargs):
        """" get user by its email"""
        email = request.query_params.get('email')
        queryset = Persons.objects.all().filter(email=email)
        serializer = personsSerializer(queryset)
        return Response(serializer.data)
        try:
            True
        except:
            error = "no user with this email: %s",email
            return Response({'error': error})

        
