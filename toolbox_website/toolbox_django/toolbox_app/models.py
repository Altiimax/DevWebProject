from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Countries(models.Model):
    id_countryCode = models.CharField(primary_key=True, max_length=5)
    countryName = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.id_countryCode} : {self.countryName} "
    
    class Meta:
        managed = True
        db_table = 'Countries'
    


class Groups(models.Model):
    id_groupName = models.CharField(primary_key=True, max_length=50)
    groupType = models.CharField(max_length=7, blank=True, null=True)
    id_town = models.ForeignKey('Towns', models.DO_NOTHING, db_column='id_town')
    groupRange = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'Groups'
    
    def __str__(self):
        return f"{self.id_groupName} ({self.groupType})"


class GroupsMembers(models.Model):
    id_person = models.OneToOneField('Persons', models.DO_NOTHING, db_column='id_person', primary_key=True)
    id_groupName = models.ForeignKey(Groups, models.DO_NOTHING, db_column='id_groupName')
    groupAdmin = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'GroupsMembers'
        unique_together = (('id_person', 'id_groupName'),)
    
    def __str__(self):
        return f"{self.id_groupName} : {self.id_person} isAdmin:{self.groupAdmin}"
  

class PersonReviews(models.Model):
    id_personReview = models.AutoField(primary_key=True)
    id_person = models.ForeignKey('Persons', models.DO_NOTHING, db_column='id_person')
    stars = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(0)])
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'PersonReviews'
    
    def __str__(self):
        return f"{self.id_person} : {self.id_personReview}"


class Persons(models.Model):
    id_person = models.AutoField(primary_key=True)
    lastName = models.CharField(max_length=50)
    firstName = models.CharField(max_length=30)
    alias = models.CharField(max_length=20, blank=True, null=True)
    birthDate = models.DateField()
    email = models.EmailField()

    class Meta:
        managed = True
        constraints = [
            models.UniqueConstraint(fields= ['alias'],name='unique_alias'),
        ]
        db_table = 'Persons'
    
    def __str__(self):
        return f"{self.id_person} : {self.lastName} {self.firstName}"


class PersonsTowns(models.Model):
    id_personsTowns = models.AutoField(primary_key=True)
    id_person = models.ForeignKey(Persons, models.DO_NOTHING, db_column='id_person')
    id_town = models.ForeignKey('Towns', models.DO_NOTHING, db_column='id_town')

    class Meta:
        managed = True
        db_table = 'PersonsTowns'
    
    def __str__(self):
        return f"{self.id_personsTowns} : {self.id_person} "


class ToolReviews(models.Model):
    id_toolReview = models.AutoField(primary_key=True)
    id_tool = models.ForeignKey('Tools', models.DO_NOTHING, db_column='id_tool')
    stars = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(0)])
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'ToolReviews'
    
    def __str__(self):
        return f"{self.id_tool} : {self.id_toolReview} "


class Tools(models.Model):
    id_tool = models.AutoField(primary_key=True)
    id_person = models.ForeignKey(Persons, models.DO_NOTHING, db_column='id_person')
    toolName = models.CharField(max_length=30)
    toolDescription = models.TextField(blank=True, null=True)
    toolPrice = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'Tools'
    
    def __str__(self):
        return f"{self.id_tool} : {self.toolName} belongs to {self.id_person}"


class ToolImages(models.Model):
    id_toolImage = models.AutoField(primary_key=True)
    id_tool = models.ForeignKey(Tools, models.DO_NOTHING, db_column='id_tool')
    image = models.ImageField(upload_to='tools')

    class Meta:
        managed = True
        db_table = 'ToolImages'
    
    def __str__(self):
        return f"{self.id_tool} : {self.image}"



class ToolsGroups(models.Model):
    id_tool = models.OneToOneField(Tools, models.DO_NOTHING, db_column='id_tool', primary_key=True)
    id_groupName = models.ForeignKey(Groups, models.DO_NOTHING, db_column='id_groupName')

    class Meta:
        managed = True
        db_table = 'ToolsGroups'
        unique_together = (('id_tool', 'id_groupName'),)
    
    def __str__(self):
        return f"{self.id_tool} in group : {self.id_groupName}"



class Towns(models.Model):
    id_town = models.AutoField(primary_key=True)
    postCode = models.IntegerField()
    townName = models.CharField(max_length=30)
    id_countryCode = models.ForeignKey(Countries, models.DO_NOTHING, db_column='id_countryCode')

    class Meta:
        managed = True
        db_table = 'Towns'

    def __str__(self):
        return f"{self.id_town} : {self.postCode} {self.townName} in {self.id_countryCode}"
