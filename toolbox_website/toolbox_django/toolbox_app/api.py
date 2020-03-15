from idlelib import query

from rest_framework import permissions, viewsets

from .models import *
from .serializers import *


class personsViewSet(viewsets.ModelViewSet):
    """
    GET & POST
    """
    queryset = Persons.objects.all().order_by('id_person')
    serializer_class = personsSerializer

class aliasesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Persons.objects.all().order_by('alias')
    serializer_class = aliasesSerializer

class memberProfileViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        email = self.request.query_params.get('email')
        queryset = Persons.objects.filter(email=email)
        return queryset
    serializer_class = personsSerializer
    
class memberToolsViewSet(viewsets.ModelViewSet):
    """
    GET & POST
    """
    def get_queryset(self):
            id_person = self.request.query_params.get('id_person')
            queryset = Tools.objects.filter(id_person=id_person)
            return queryset
    serializer_class = memberToolsSerializer

class toolImagesViewSet(viewsets.ModelViewSet):
    """
    GET & POST
    """
    def get_queryset(self):
            id_tool = self.request.query_params.get('id_tool')
            queryset = ToolImages.objects.filter(id_tool=id_tool)
            return queryset
    serializer_class = toolImagesSerializer