-- USING XXXXXXX  

insert into Countries (Id_CountryCode, CountryName)
values  ('BE', 'Belgique'),
        ('FR', 'France');

insert into Towns (PostCode, TownName,Id_CountryCode)
values  (1330, 'Rixensart','BE'),
        (1000, 'Bruxelles','BE');

insert into Persons (LastName, FirstName,Alias,BirthDate)
values  ('Michotte','Martin','Rotchi','1995-03-25'),
        ('Fontaine','Allan',Null,'1996-04-26'),
        ('Vandenede','Kévin','Altimax','1994-05-27');

insert into PersonsTowns (Id_Person,Id_Town)
values (1,2);