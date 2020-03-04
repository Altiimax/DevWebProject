--use geotools_db   


--inserts

insert into Countries (Id_CountryCode, CountryName)
values  ('BE', 'Belgique'),
        ('FR', 'France');

insert into Towns (PostCode, TownName,Id_CountryCode)
values  (1330, 'Rixensart','BE'),
        (1000, 'Bruxelles','BE');

insert into Persons (LastName, FirstName,Alias,BirthDate,Email)
values  ('Michotte','Martin','Rotchi','1995-03-25','martin.michotte@gmail.com'),
        ('Fontaine','Allan',Null,'1996-04-26','allan.fontaine@gmail.com'),
        ('Vandenede','Kévin','Altimax','1994-05-27','kevin.vandened@gmail.com');

insert into PersonsTowns (Id_Person,Id_Town)
values (1,2);

insert into Tools (Id_Person,ToolName,ToolDescription,ToolPrice,ToolImages)
values (1,'Tronçonneuse','Tronçonneuse de 50cm en excellent état',10.3,'{"1_1_1"}');



--delete all 
delete from Tools;
delete from PersonsTowns;
delete from Persons;
delete from Towns;
delete from Countries;
