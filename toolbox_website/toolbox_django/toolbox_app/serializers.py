from rest_framework import serializers

from .models import *

##################################
###  TOWNS RELATED SERIALIZERS ###

class countriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Countries
        fields = ('id_countryCode', 'countryName')

class townsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Towns
        fields = ('id_town','postCode','townName','id_countryCode')

class personsTownsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonsTowns
        fields = ('id_person','id_town')

class personsTownsDetailSerializer(serializers.ModelSerializer):
    town = townsSerializer(source='id_town',  read_only=True)
    class Meta:
        model = PersonsTowns
        fields = ('id_person','town')

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
###  GROUP RELATED SERIALIZERS ###

class groupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Groups
        fields = ('id_groupName', 'groupType', 'groupRange','id_town')

class groupsDetailSerializer(serializers.ModelSerializer):
    town = townsSerializer(source='id_town', read_only=True)
    class Meta:
        model = Groups
        fields = ('id_groupName', 'groupType', 'groupRange','town')

class groupsMembersSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupsMembers
        fields = ('id_person','id_groupName','groupAdmin')

class groupsMembersDetailSerializer(serializers.ModelSerializer):
    member = personsSerializer(source='id_person', read_only=True)
    class Meta:
        model = GroupsMembers
        fields = ('member','groupAdmin')

class groupsToolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToolsGroups
        fields = ('id_tool','id_groupName')

class groupsToolsDetailSerializer(serializers.ModelSerializer):
    tool = toolsDetailSerializer(source='id_tool', read_only=True)
    class Meta:
        model = ToolsGroups
        fields = ('tool',)

class membersGroupsDetailSerializer(serializers.ModelSerializer):
    group = groupsSerializer(source='id_groupName', read_only=True)
    class Meta:
        model = GroupsMembers
        fields = ('group','groupAdmin')

class toolsGroupsDetailSerializer(serializers.ModelSerializer):
    group = groupsSerializer(source='id_groupName', read_only=True)
    class Meta:
        model = ToolsGroups
        fields = ('group',)

##################################
###      OTHER SERIALIZERS     ###

class aliasesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persons
        fields =('alias',)