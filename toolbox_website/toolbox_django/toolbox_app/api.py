from idlelib import query

from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import *
from .serializers import *


class personsViewSet(viewsets.GenericViewSet):

    # GET 127.0.0.1:8000/api/persons/
    def list(self, request, *args, **kwargs):
        """" list all users """
        queryset = Persons.objects.all().order_by('lastName')
        serializer = personsSerializer(queryset, many=True)
        return Response(serializer.data)

    # POST 127.0.0.1:8000/api/persons/
    def create(self, request, *args, **kwargs):
        """" create a new user """
        serializer = personsSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # GET 127.0.0.1:8000/api/persons/aliases/
    @action(detail=False, methods=['get'])
    def aliases(self, request, *args, **kwargs):
        """" get all used aliases"""
        queryset = Persons.objects.all()
        serializer = aliasesSerializer(queryset, many=True)
        return Response(serializer.data)
    
    # GET 127.0.0.1:8000/api/persons/byemail/?email=john.doe@gmail.com
    @action(detail=False, methods=['get'])
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

    # GET,POST 127.0.0.1:8000/api/persons/1/tools/
    @action(detail=True, methods=['get','post'])
    def tools(self, request, pk=None, *args, **kwargs):
        if request.method == 'GET':
            """" get all tools belonging to a user"""
            queryset = Tools.objects.filter(id_person=pk)
            serializer = toolsDetailSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            """" add a new tool to the user """
            serializer = toolsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
