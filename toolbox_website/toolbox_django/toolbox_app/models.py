from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Countries(models.Model):
    id_countrycode = models.CharField(primary_key=True, max_length=5)
    countryname = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.id_countrycode} : {self.countryname} "
    
    class Meta:
        managed = True
        db_table = 'countries'
    


class Groups(models.Model):
    id_groupname = models.CharField(primary_key=True, max_length=50)
    grouptype = models.CharField(max_length=7, blank=True, null=True)
    id_town = models.ForeignKey('Towns', models.DO_NOTHING, db_column='id_town')
    grouprange = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'groups'
    
    def __str__(self):
        return f"{self.id_groupname} ({self.grouptype})"


class Groupsmembers(models.Model):
    id_person = models.OneToOneField('Persons', models.DO_NOTHING, db_column='id_person', primary_key=True)
    id_groupname = models.ForeignKey(Groups, models.DO_NOTHING, db_column='id_groupname')
    groupadmin = models.BooleanField()

    class Meta:
        managed = True
        db_table = 'groupsmembers'
        unique_together = (('id_person', 'id_groupname'),)
    
    def __str__(self):
        return f"{self.id_groupname} : {self.id_person} isAdmin:{self.groupadmin}"
  

class Personreviews(models.Model):
    id_personreview = models.AutoField(primary_key=True)
    id_person = models.ForeignKey('Persons', models.DO_NOTHING, db_column='id_person')
    stars = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(0)])
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'personreviews'
    
    def __str__(self):
        return f"{self.id_person} : {self.id_personreview}"


class Persons(models.Model):
    id_person = models.AutoField(primary_key=True)
    lastname = models.CharField(max_length=50)
    firstname = models.CharField(max_length=30)
    alias = models.CharField(max_length=20, blank=True, null=True)
    birthdate = models.DateField()
    email = models.EmailField()

    class Meta:
        managed = True
        db_table = 'persons'
    
    def __str__(self):
        return f"{self.id_person} : {self.lastname} {self.firstname}"


class Personstowns(models.Model):
    id_personstowns = models.AutoField(primary_key=True)
    id_person = models.ForeignKey(Persons, models.DO_NOTHING, db_column='id_person')
    id_town = models.ForeignKey('Towns', models.DO_NOTHING, db_column='id_town')

    class Meta:
        managed = True
        db_table = 'personstowns'
    
    def __str__(self):
        return f"{self.id_personstowns} : {self.id_person} "


class Toolreviews(models.Model):
    id_toolreview = models.AutoField(primary_key=True)
    id_tool = models.ForeignKey('Tools', models.DO_NOTHING, db_column='id_tool')
    stars = models.IntegerField(validators=[MaxValueValidator(10), MinValueValidator(0)])
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'toolreviews'
    
    def __str__(self):
        return f"{self.id_tool} : {self.id_toolreview} "


class Tools(models.Model):
    id_tool = models.AutoField(primary_key=True)
    id_person = models.ForeignKey(Persons, models.DO_NOTHING, db_column='id_person')
    toolname = models.CharField(max_length=30, blank=True, null=True)
    tooldescription = models.TextField(blank=True, null=True)
    toolprice = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'tools'
    
    def __str__(self):
        return f"{self.id_tool} : {self.toolname} belongs to {self.id_person}"


class ToolImages(models.Model):
    id_toolImage = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='tools')

    class Meta:
        managed = True
        db_table = 'ToolImages'
    
    def __str__(self):
        return f"{self.id_toolImage} : {self.image}"


class ToolsToolImages(models.Model):
    id_tool = models.OneToOneField(Tools, models.DO_NOTHING, db_column='id_tool', primary_key=True)
    id_toolImage = models.ForeignKey(ToolImages, models.DO_NOTHING, db_column='id_toolImage')

    class Meta:
        managed = True
        db_table = 'ToolsToolImages'
        unique_together = (('id_tool', 'id_toolImage'),)
    
    def __str__(self):
        return f"{self.id_tool} : {self.id_toolImage}"



class Toolsgroups(models.Model):
    id_tool = models.OneToOneField(Tools, models.DO_NOTHING, db_column='id_tool', primary_key=True)
    id_groupname = models.ForeignKey(Groups, models.DO_NOTHING, db_column='id_groupname')

    class Meta:
        managed = True
        db_table = 'toolsgroups'
        unique_together = (('id_tool', 'id_groupname'),)
    
    def __str__(self):
        return f"{self.id_tool} in group : {self.id_groupname}"



class Towns(models.Model):
    id_town = models.AutoField(primary_key=True)
    postcode = models.IntegerField()
    townname = models.CharField(max_length=30)
    id_countrycode = models.ForeignKey(Countries, models.DO_NOTHING, db_column='id_countrycode')

    class Meta:
        managed = True
        db_table = 'towns'

    def __str__(self):
        return f"{self.id_town} : {self.postcode} {self.townname} in {self.id_countrycode}"
