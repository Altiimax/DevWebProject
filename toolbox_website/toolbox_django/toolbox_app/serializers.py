from rest_framework import serializers

from .models import *

class PersonsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Persons
        fields =('lastname','firstname','email','birthdate')