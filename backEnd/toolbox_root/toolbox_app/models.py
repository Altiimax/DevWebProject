from django.db import models

class Countries(models.Model):
    id_countrycode = models.CharField(primary_key=True, max_length=5)
    countryname = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'countries'


class Groups(models.Model):
    id_groupname = models.CharField(primary_key=True, max_length=50)
    grouptype = models.CharField(max_length=7, blank=True, null=True)
    id_town = models.ForeignKey('Towns', models.DO_NOTHING, db_column='id_town')
    grouprange = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'groups'


class Groupsmembers(models.Model):
    id_person = models.OneToOneField('Persons', models.DO_NOTHING, db_column='id_person', primary_key=True)
    id_groupname = models.ForeignKey(Groups, models.DO_NOTHING, db_column='id_groupname')
    groupadmin = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'groupsmembers'
        unique_together = (('id_person', 'id_groupname'),)


class Personreviews(models.Model):
    id_personreview = models.AutoField(primary_key=True)
    id_person = models.ForeignKey('Persons', models.DO_NOTHING, db_column='id_person')
    stars = models.IntegerField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'personreviews'


class Persons(models.Model):
    id_person = models.AutoField(primary_key=True)
    lastname = models.CharField(max_length=50)
    firstname = models.CharField(max_length=30)
    alias = models.CharField(max_length=20, blank=True, null=True)
    birthdate = models.DateField(blank=True, null=True)
    email = models.CharField(max_length=80, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'persons'


class Personstowns(models.Model):
    id_personstowns = models.AutoField(primary_key=True)
    id_person = models.ForeignKey(Persons, models.DO_NOTHING, db_column='id_person')
    id_town = models.ForeignKey('Towns', models.DO_NOTHING, db_column='id_town')

    class Meta:
        managed = False
        db_table = 'personstowns'


class Toolreviews(models.Model):
    id_toolreview = models.AutoField(primary_key=True)
    id_tool = models.ForeignKey('Tools', models.DO_NOTHING, db_column='id_tool')
    stars = models.IntegerField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'toolreviews'


class Tools(models.Model):
    id_tool = models.AutoField(primary_key=True)
    id_person = models.ForeignKey(Persons, models.DO_NOTHING, db_column='id_person')
    toolname = models.CharField(max_length=30, blank=True, null=True)
    tooldescription = models.TextField(blank=True, null=True)
    toolprice = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    toolimages = models.TextField(blank=True, null=True)  # This field type is a guess.

    class Meta:
        managed = False
        db_table = 'tools'


class Toolsgroups(models.Model):
    id_tool = models.OneToOneField(Tools, models.DO_NOTHING, db_column='id_tool', primary_key=True)
    id_groupname = models.ForeignKey(Groups, models.DO_NOTHING, db_column='id_groupname')

    class Meta:
        managed = False
        db_table = 'toolsgroups'
        unique_together = (('id_tool', 'id_groupname'),)


class Towns(models.Model):
    id_town = models.AutoField(primary_key=True)
    postcode = models.IntegerField()
    townname = models.CharField(max_length=30)
    id_countrycode = models.ForeignKey(Countries, models.DO_NOTHING, db_column='id_countrycode')

    class Meta:
        managed = False
        db_table = 'towns'
