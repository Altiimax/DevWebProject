--use toolbox_db   

-- fake data generated with : https://www.fakepersongenerator.com/Index/generate

--inserts

insert into "Countries" ("id_countryCode", countryname)
values  ('BE', 'Belgique'),
        ('FR', 'France');

insert into "Towns" ("postCode", "townName","id_countryCode")
values  (1330, 'Rixensart','BE'),
        (1000, 'Bruxelles','BE');

insert into "Persons" ("lastName", "firstName", "alias", "birthDate", "email", "password")
values  ('Gordon','Harry E ','HEGy','1969-10-07','marietta.kel@hotmail.com','testPwd1'),
        ('Sheridan','Dorothy',Null,'1973-01-01','garth2002@hotmail.com','testPwd1'),
        ('Doak','Kristine','shDoak','1983-03-18','favian1972@yahoo.com','testPwd1');

insert into "PersonsTowns" (id_person,id_town)
values (1,2);

insert into "Tools" (id_person,"toolName","toolDescription","toolPrice")
values (1,'Tronçonneuse','Tronçonneuse de 50cm en excellent état',10.3);



 
--delete from Tools;
--delete from PersonsTowns;
--delete from Persons;
--delete from Towns;
--delete from Countries;
