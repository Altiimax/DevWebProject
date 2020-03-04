--https://sqliteonline.com

--use geotools_db   

create table Countries
(
    Id_CountryCode varChar(5) not null,
    CountryName varChar(40) not null,
    constraint pk_Countries primary key (Id_CountryCode)
);

create table Towns
(
    Id_Town serial,
    PostCode integer not null,
    TownName varChar(40) not null,
    Id_CountryCode varChar(5) not null,
    constraint pk_Town primary key (Id_Town),
    constraint fk_Countries_Towns foreign key(Id_CountryCode) references Countries(Id_CountryCode)
    on update restrict on delete restrict
);


create table Persons
(
    Id_Person serial,
    LastName varChar(50) not null,
    FirstName varChar(30) not null,
    Alias varChar(20),
    BirthDate date,  
    Email varChar(80),  
    constraint pk_Persons primary key(Id_Person)
);

create table PersonsTowns
(
    Id_PersonsTowns serial,
    Id_Person integer not null,
    Id_Town integer not null,
    constraint pk_PersonsTowns primary key(Id_PersonsTowns),
    constraint fk_Persons_PersonsTowns foreign key(Id_Person) 
        references Persons(Id_Person) 
        on update restrict on delete restrict,
    constraint fk_Towns_PersonsTowns foreign key(Id_Town)
        references Towns(Id_Town)
        on update restrict on delete restrict
);

create table PersonReviews
(
    Id_PersonReview serial,
    Id_Person integer not null,
    Stars integer not null,
    Comment text,
    constraint pk_PersonReviews primary key(Id_PersonReview),
    constraint fk_PersonReviews_Persons foreign key(Id_Person)
        references Persons(Id_Person)
        on update restrict on delete restrict
);


create table Tools
( 
    Id_Tool serial,
    Id_Person integer not null,
    ToolName varChar(50),
    ToolDescription text,
    ToolPrice numeric(8,2),
    ToolImages text [],
    constraint pk_Tools primary key(Id_Tool),
    constraint fk_Tools_Persons foreign key(Id_Person)
        references Persons(Id_Person)
        on update restrict on delete restrict
);

create table ToolReviews
(
    Id_ToolReview serial,
    Id_Tool integer not null,
    Stars integer not null,
    Comment text,
    constraint pk_ToolReviews primary key(Id_ToolReview),
    constraint fk_ToolReviews_Tools foreign key(Id_Tool)
        references Tools(Id_Tool)
        on update restrict on delete restrict
);


create table Groups
(
    Id_GroupName varChar(50) not null,
    GroupType varChar(7) default 'Private' 
        CHECK (GroupType in ('Public', 'Private')),
    Id_Town integer not null,
    GroupRange integer not null,
    constraint pk_Groups primary key(Id_GroupName),
    constraint fk_Groups_Towns foreign key(Id_Town)
        references Towns(Id_Town)
        on update restrict on delete restrict
);

create table GroupsMembers
(
    Id_Person integer not null,
    Id_GroupName varChar(50) not null,
    GroupAdmin boolean not null,
    constraint pk_GroupMembers primary key(Id_Person,Id_GroupName),
    constraint fk_GroupMembers_Persons foreign key(Id_Person)
        references Persons(Id_Person)
        on update restrict on delete restrict,
    constraint fk_GroupMembers_Groups foreign key(Id_GroupName)
        references Groups(Id_GroupName)
        on update restrict on delete restrict
);

create table ToolsGroups
(
    Id_Tool integer not null,
    Id_GroupName varChar(50) not null,
    constraint pk_ToolsGroups primary key(Id_Tool, Id_GroupName),
    constraint fk_ToolsGroups_Tools foreign key(Id_Tool)
        references Tools(Id_Tool)
        on update restrict on delete restrict,
    constraint fk_ToolsGroups_Groups foreign key(Id_GroupName)
        references Groups(Id_GroupName)
        on update restrict on delete restrict
);