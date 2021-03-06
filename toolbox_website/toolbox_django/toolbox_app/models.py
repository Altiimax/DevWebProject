from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Countries(models.Model):
    id_countryCode = models.CharField(primary_key=True, max_length=5)
    countryName = models.CharField(max_length=30)
  
    class Meta:
        managed = True
        db_table = 'Countries'
    


class Groups(models.Model):
    id_groupName = models.CharField(primary_key=True, max_length=50)
    groupDescription = models.TextField(blank=True, null=True)
    groupType = models.CharField(max_length=7, blank=True, null=True)
    id_town = models.ForeignKey('Towns', models.DO_NOTHING, db_column='id_town')
    groupRange = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'Groups'
    


class GroupsMembers(models.Model):
    id_groupsMembers = models.AutoField(primary_key=True)
    id_person = models.ForeignKey('Persons', models.DO_NOTHING, db_column='id_person')
    id_groupName = models.ForeignKey(Groups, models.DO_NOTHING, db_column='id_groupName')
    groupAdmin = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'GroupsMembers'
        unique_together = (('id_person', 'id_groupName'),)

  

class PersonReviews(models.Model):
    id_personReview = models.AutoField(primary_key=True)
    id_person = models.ForeignKey('Persons', models.DO_NOTHING, db_column='id_person')
    stars = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(0)])
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'PersonReviews'



class Persons(models.Model):
    id_person = models.AutoField(primary_key=True)
    lastName = models.CharField(max_length=150)
    firstName = models.CharField(max_length=100)
    alias = models.CharField(max_length=100, blank=True, null=True)
    birthDate = models.DateField()
    email = models.EmailField()
    password= models.CharField(max_length=254)

    def get_by_natural_key(self, username):
        return self.get(email=username)

    class Meta:
        managed = True
        constraints = [
            models.UniqueConstraint(fields= ['alias'],name='unique_alias'),
            models.UniqueConstraint(fields= ['email'],name='unique_email'),
        ]
        db_table = 'Persons'


class PersonsTowns(models.Model):
    id_personsTowns = models.AutoField(primary_key=True)
    id_person = models.ForeignKey(Persons, models.DO_NOTHING, db_column='id_person')
    id_town = models.ForeignKey('Towns', models.DO_NOTHING, db_column='id_town')

    class Meta:
        managed = True
        db_table = 'PersonsTowns'
    


class ToolReviews(models.Model):
    id_toolReview = models.AutoField(primary_key=True)
    id_tool = models.ForeignKey('Tools', models.DO_NOTHING, db_column='id_tool')
    stars = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(0)])
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'ToolReviews'



class Tools(models.Model):
    id_tool = models.AutoField(primary_key=True)
    id_person = models.ForeignKey(Persons, models.DO_NOTHING, db_column='id_person')
    toolName = models.CharField(max_length=30)
    toolDescription = models.TextField(blank=True, null=True)
    toolPrice = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    def __repr__(self):
        return "" + toolName

    class Meta:
        managed = True
        db_table = 'Tools'

class ToolImages(models.Model):
    id_toolImage = models.AutoField(primary_key=True)
    id_tool = models.ForeignKey(Tools, models.DO_NOTHING, db_column='id_tool')
    image = models.ImageField(upload_to='toolsImgs')

    class Meta:
        managed = True
        db_table = 'ToolImages'
    


class ToolsGroups(models.Model):
    id_toolGroups = models.AutoField(primary_key=True)
    id_tool = models.ForeignKey(Tools, models.DO_NOTHING, db_column='id_tool')
    id_groupName = models.ForeignKey(Groups, models.DO_NOTHING, db_column='id_groupName')

    class Meta:
        managed = True
        db_table = 'ToolsGroups'
        unique_together = (('id_tool', 'id_groupName'),)
    


class Towns(models.Model):
    id_town = models.AutoField(primary_key=True)
    postCode = models.IntegerField()
    townName = models.CharField(max_length=30)
    lat = models.FloatField()
    lng = models.FloatField()
    id_countryCode = models.ForeignKey(Countries, models.DO_NOTHING, db_column='id_countryCode')

    class Meta:
        managed = True
        db_table = 'Towns'
