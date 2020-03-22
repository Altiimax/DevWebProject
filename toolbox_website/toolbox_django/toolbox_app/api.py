import json
from idlelib import query
from os.path import defpath

from django.http import QueryDict
from rest_framework import permissions, status, viewsets
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
        
        elif request.method == 'POST':
            """" add a new tool to the user """
            data = request.data.copy()
            data['id_person']=pk
            serializer = toolsSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # GET,POST 127.0.0.1:8000/api/persons/1/reviews/
    @action(detail=True, methods=['get','post'])
    def reviews(self, request, pk=None, *args, **kwargs):
        if request.method == 'GET':
            """" get all reviews belonging to a user"""
            queryset = PersonReviews.objects.filter(id_person=pk)
            serializer = personReviewsSerializer(queryset, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            """" add a new review to the user """
            data = request.data.copy()
            data['id_person']=pk
            serializer = personReviewsSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)





class toolsViewSet(viewsets.GenericViewSet):

    # GET 127.0.0.1:8000/api/tools/
    def list(self, request, *args, **kwargs):
        """" list all tools """
        queryset = Tools.objects.all()
        serializer = toolsDetailSerializer(queryset, many=True)
        return Response(serializer.data)

    # GET,POST 127.0.0.1:8000/api/tools/1/images/
    @action(detail=True, methods=['get','post'])
    def images(self, request, pk=None, *args, **kwargs):
        if request.method == 'GET':
            """" get all images belonging to a tool"""
            queryset = ToolImages.objects.filter(id_tool=pk)
            serializer = toolImagesSerializer(queryset, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            """" add a new image to the tool """
            data = request.data.copy()
            data['id_tool']=pk
            serializer = toolImagesSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # GET,POST 127.0.0.1:8000/api/tools/1/reviews/
    @action(detail=True, methods=['get','post'])
    def reviews(self, request, pk=None, *args, **kwargs):
        if request.method == 'GET':
            """" get all reviews made on a tool"""
            queryset = ToolReviews.objects.filter(id_tool=pk)
            serializer = toolReviewsSerializer(queryset, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            """" add a new review on the tool """
            data = request.data.copy()
            data['id_tool']=pk
            serializer = toolReviewsSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)



class groupsViewSet(viewsets.GenericViewSet):

    # GET 127.0.0.1:8000/api/groups/
    def list(self, request, *args, **kwargs):
        """" list all groups (public & private) """
        queryset = Groups.objects.all()
        serializer = groupsSerializer(queryset, many=True)
        return Response(serializer.data)
    
    # GET 127.0.0.1:8000/api/groups/public/
    @action(detail=False, methods=['get','post'])
    def public(self, request, *args, **kwargs):
        if request.method == 'GET':
            """" list all public groups """
            queryset = Groups.objects.filter(groupType='public')
            serializer = groupsSerializer(queryset, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            """" create a new public group """
            serializer = groupsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


    # GET 127.0.0.1:8000/api/groups/private/
    @action(detail=False, methods=['get','post'])
    def private(self, request, *args, **kwargs):
        if request.method == 'GET':
            """" list all private groups """
            queryset = Groups.objects.filter(groupType='private')
            serializer = groupsSerializer(queryset, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            """" create a new private group """
            serializer = groupsSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


    # GET,POST 127.0.0.1:8000/api/groups/members/
    @action(detail=False, methods=['get','post'])
    def members(self, request, *args, **kwargs):
        if request.method == 'GET':
            # GET 127.0.0.1:8000/api/groups/members/?groupName=TestGroup1
            """" list all members of a group """
            groupName = request.query_params.get('groupName')
            queryset = GroupsMembers.objects.filter(id_groupName=groupName)
            serializer = groupsmembersDetailSerializer(queryset, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            """" add a new member to a group """
            serializer = groupsmembersSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    # GET,POST 127.0.0.1:8000/api/groups/admins/
    @action(detail=False, methods=['get'])
    def admins(self, request, *args, **kwargs):
        # GET 127.0.0.1:8000/api/groups/members/?groupName=TestGroup1
        """" list all admins of a group """
        groupName = request.query_params.get('groupName')
        queryset = GroupsMembers.objects.filter(id_groupName=groupName)
        queryset = GroupsMembers.objects.filter(groupAdmin=True)
        serializer = groupsmembersDetailSerializer(queryset, many=True)
        return Response(serializer.data)