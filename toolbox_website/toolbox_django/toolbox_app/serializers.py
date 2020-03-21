from rest_framework import serializers

from .models import *

##################################
###  TOOL RELATED SERIALIZERS  ###

class toolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tools
        fields =('id_person', 'id_tool', 'toolName', 'toolDescription', 'toolPrice')

class toolImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolImages
        fields = ('id_toolImage', 'id_tool', 'image')

class toolReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolReviews
        fields = ('id_toolReview', 'id_tool', 'stars','comment')
        
class toolsDetailSerializer(serializers.ModelSerializer):
    toolImages = toolImagesSerializer(source='toolimages_set', many=True)
    reviews = toolReviewsSerializer(source='toolreviews_set', many=True)

    class Meta:
        model = Tools
        fields =('id_tool','toolName','toolDescription','toolPrice','toolImages', 'reviews')

##################################
###  GROUP RELATED SERIALIZERS ###

class groupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = ('id_groupName', 'groupType', 'groupRange')

class groupsmembersSerializer(serializers.ModelSerializer):
    group = groupsSerializer(source='groups_set', many=True)
    class Meta:
        model = GroupsMembers
        fields = ('group','groupAdmin')


##################################
### PERSON RELATED SERIALIZERS ###

class personReviewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonReviews
        fields = ('id_personReview', 'id_person', 'stars','comment')


class personsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields = ('id_person', 'lastName', 'firstName', 'alias', 'birthDate', 'email')



##################################
###      OTHER SERIALIZERS     ###

class aliasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields =('alias',)