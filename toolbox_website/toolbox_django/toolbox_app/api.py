from rest_framework import permissions, viewsets
from .serializers import *
from .models import *

class PersonsViewSet(viewsets.ModelViewSet):
    """
    Returns a list of all __registered__ accounts in the system sorted by email address.
    """
    queryset = Persons.objects.all().order_by('email')
    permission_classes =[
        #permissions.AllowAny #il faudra modifier ceci! 
        permissions.IsAuthenticated
    ]
    serializer_class = PersonsSerializer
