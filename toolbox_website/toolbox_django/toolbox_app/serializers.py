from rest_framework import serializers

from .models import *


class personsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields = ('id_person', 'lastName', 'firstName', 'alias', 'birthDate', 'email')