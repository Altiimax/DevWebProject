from idlelib import query

from rest_framework import permissions, viewsets

from .models import *
from .serializers import *
 
class personViewSet(viewsets.ModelViewSet):
    """
    GET person by email
    POST a new person 
    """
    def get_queryset(self):
        email = self.request.query_params.get('email')
        queryset = Persons.objects.filter(email=email)
        return queryset
    serializer_class = personsSerializer


class aliasesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET all aliases already used 
    """
    queryset = Persons.objects.all().order_by('alias')
    serializer_class = aliasesSerializer

    
class personToolsViewSet(viewsets.ModelViewSet):
    """
    GET all the tools and their reviews of a person by it's ID
    POST a new tool associated to a person
    """
    def get_queryset(self):
            id_person = self.request.query_params.get('id_person')
            queryset = Tools.objects.filter(id_person=id_person)
            return queryset
    serializer_class = toolsSerializer

class personReviewViewSet(viewsets.ModelViewSet):
    """
    GET all reviews belonging to a certain person
    POST a new review associated to a person 
    """
    def get_queryset(self):
            id_person = self.request.query_params.get('id_person')
            queryset = PersonReviews.objects.filter(id_person=id_person)
            return queryset
    serializer_class = personReviewsSerializer



class toolImagesViewSet(viewsets.ModelViewSet):
    """
    GET all images belonging to a certain tool
    POST a new image associated to a tool 
    """
    def get_queryset(self):
            id_tool = self.request.query_params.get('id_tool')
            queryset = ToolImages.objects.filter(id_tool=id_tool)
            return queryset
    serializer_class = toolImagesSerializer

class toolReviewViewSet(viewsets.ModelViewSet):
    """
    GET all reviews belonging to a certain tool
    POST a new review associated to a tool 
    """
    def get_queryset(self):
            id_tool = self.request.query_params.get('id_tool')
            queryset = ToolReviews.objects.filter(id_tool=id_tool)
            return queryset
    serializer_class = toolReviewsSerializer