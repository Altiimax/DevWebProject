from rest_framework import serializers

from .models import *

class aliasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields =('alias',)

class personsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields = ('id_person', 'lastname', 'firstname', 'alias', 'birthdate', 'email')


class memberToolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tools
        fields =('id_person','id_tool','toolname','tooldescription','toolprice')

class toolImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolImages
        fields = ('id_tool','id_toolImage', 'image')