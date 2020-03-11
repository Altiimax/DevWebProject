--use toolbox_db   

-- fake data generated with : https://www.fakepersongenerator.com/Index/generate

--inserts

insert into Countries (Id_CountryCode, CountryName)
values  ('BE', 'Belgique'),
        ('FR', 'France');

insert into Towns (PostCode, TownName,Id_CountryCode)
values  (1330, 'Rixensart','BE'),
        (1000, 'Bruxelles','BE');

insert into Persons (LastName, FirstName,Alias,BirthDate,Email)
values  ('Gordon','Harry E ','HEGy','1969-10-07','marietta.kel@hotmail.com'),
        ('Sheridan','Dorothy',Null,'1973-01-01','garth2002@hotmail.com'),
        ('Doak','Kristine','shDoak','1983-03-18','favian1972@yahoo.com');

insert into PersonsTowns (Id_Person,Id_Town)
values (1,2);

insert into Tools (Id_Person,ToolName,ToolDescription,ToolPrice)
values (1,'Tronçonneuse','Tronçonneuse de 50cm en excellent état',10.3);


 
--delete from Tools;
--delete from PersonsTowns;
--delete from Persons;
--delete from Towns;
--delete from Countries;
