--use toolbox_db   

--inserts

insert into "Countries" ("id_countryCode", "countryName")
values  ('BE', 'Belgium'),
        ('DE', 'Germany'),
        ('FR', 'France');

insert into "Towns" ("postCode", "townName","lat","lng","id_countryCode")
values  (1330, 'Rixensart',50.715626,4.531035,'BE'),
        (1000, 'Bruxelles',50.850346,4.351721,'BE'),
        (1300, 'Wavre',50.716881,4.61074,'BE'),
        (1340, 'Ottignies',50.665901,4.5671,'BE'),
        (3000, 'Leuven',50.879845,4.700518,'BE'),
        (2000, 'Antwerpen',51.22111,4.399708,'BE'),
        (75000, 'Paris',48.856506,2.352133,'FR');

insert into "Persons" ("lastName", "firstName", "alias", "birthDate", "email", "password")
values  ('Gordon','Harry E ','HEGy','1969-10-07','gorden.harry@hotmail.com','$2a$10$hgivPBtUFmqnNZmvHsMeW.WLn/qHwXgVw16WMpcQXGcx74TJbNlry'),  --mdp = testPwd1 (pour tous)
        ('Sheridan','Dorothy','Dor0','1973-01-01','sheridan.dorothy@hotmail.com','$2a$10$hgivPBtUFmqnNZmvHsMeW.WLn/qHwXgVw16WMpcQXGcx74TJbNlry'),
        ('Doak','Kristine','shDoak','1983-03-18','doak.kristine@yahoo.com','$2a$10$hgivPBtUFmqnNZmvHsMeW.WLn/qHwXgVw16WMpcQXGcx74TJbNlry');

insert into "PersonsTowns" ("id_person","id_town")
values  (1,1),
        (1,2),
        (1,3),
        (2,1),
        (2,3),
        (3,8);

insert into "Tools" ("id_person","toolName","toolDescription","toolPrice")
values  (1,'Chainsaw','This is a test description !',10.3),
        (1,'Jigsaw','This is a test description !',11.3),
        (1,'Ladder','This is a test description !',12.3),
        (1,'jackhammer','This is a test description !',43.3),
        (2,'Chainsaw','This is a test description !',8.3),
        (2,'Hammer','This is a test description !',0),
        (2,'Ladder','This is a test description !',21.3),
        (2,'Spade','This is a test description !',4.1),
        (3,'Bulldozer','This is a test description !',100),
        (3,'Concrete mixer','This is a test description !',50.2);


 -- insert tool-images manually !

insert into "Groups" ("id_groupName","groupType","groupRange","id_town","groupDescription")
values  ('TestGroup1','public',50,1,'This is a test description !'),
        ('TestGroup2','public',35,2,'This is a test description !'),
        ('TestGroup3','private',20,1,'This is a test description !'),
        ('TestGroup4','public',40,1,'This is a test description !');

insert into "GroupsMembers" ("id_person","groupAdmin","id_groupName")
values  (1,true,'TestGroup1'),
        (1,true,'TestGroup2'),
        (1,false,'TestGroup3'),
        (2,false,'TestGroup1'),
        (2,true,'TestGroup3'),
        (3,true,'TestGroup4');

insert into "ToolsGroups" ("id_tool","id_groupName")
values  (1,'TestGroup1'),
        (2,'TestGroup1'),
        (3,'TestGroup1'),
        (4,'TestGroup1'),
        (1,'TestGroup2'),
        (4,'TestGroup2'),
        (5,'TestGroup2'),
        (6,'TestGroup2'),
        (7,'TestGroup2'),
        (9,'TestGroup4'),
        (10,'TestGroup4');

        


