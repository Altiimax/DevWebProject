--https://sqliteonline.com

--use toolbox_db   
create domain mail varChar(80);
create domain country_code varChar(5);
create domain long_varchar varChar(50);
create domain medium_varchar varChar(30);
create domain small_varchar varChar(20);

create table Countries
(
    Id_CountryCode varChar(5) not null,
    CountryName medium_varchar not null,
    constraint pk_Countries primary key (Id_CountryCode)
);

create table Towns
(
    Id_Town serial,
    PostCode integer not null,
    TownName medium_varchar not null,
    Id_CountryCode country_code not null,
    constraint pk_Town primary key (Id_Town),
    constraint fk_Countries_Towns foreign key(Id_CountryCode) references Countries(Id_CountryCode)
    on update restrict on delete restrict
);


create table Persons
(
    Id_Person serial,
    LastName long_varchar not null,
    FirstName medium_varchar not null,
    Alias small_varchar,
    BirthDate date,
    Email varchar(254) not null,
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
    ToolName medium_varchar not null,
    ToolDescription text,
    ToolPrice numeric(8,2),
    constraint pk_Tools primary key(Id_Tool),
    constraint fk_Tools_Persons foreign key(Id_Person)
        references Persons(Id_Person)
        on update restrict on delete restrict
);

create table if not exists ToolImages
(
	id_toolImage serial not null
		constraint ToolImages_pkey
			primary key,
	image varchar(100) not null
);


create table if not exists ToolsToolImages
(
	id_tool integer not null
		constraint ToolsToolImages_pkey
			primary key
		constraint ToolsToolImages_id_tool_941739e8_fk_tools_id_tool
			references tools
				deferrable initially deferred,
	id_toolImage integer not null
		constraint ToolsToolImages_id_toolImage_84d1fc2f_fk_ToolImage
			references ToolImages
				deferrable initially deferred,
	constraint ToolsToolImages_id_tool_id_toolImage_6ff2c1a4_uniq
		unique (id_tool, id_toolImage)
);

create index if not exists ToolsToolImages_id_toolImage_84d1fc2f
	on ToolsToolImages (id_toolImage);


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
    Id_GroupName long_varchar not null,
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
    Id_GroupName long_varchar not null,
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
    Id_GroupName long_varchar not null,
    constraint pk_ToolsGroups primary key(Id_Tool, Id_GroupName),
    constraint fk_ToolsGroups_Tools foreign key(Id_Tool)
        references Tools(Id_Tool)
        on update restrict on delete restrict,
    constraint fk_ToolsGroups_Groups foreign key(Id_GroupName)
        references Groups(Id_GroupName)
        on update restrict on delete restrict
);



-- drop table ToolsGroups;
-- drop table GroupsMembers;
-- drop table Groups;
-- drop table ToolReviews;
-- drop table ToolsToolImages;
-- drop table ToolImages;
-- drop table Tools;
-- drop table PersonReviews;
-- drop table PersonsTowns;
-- drop table Persons;
-- drop table Towns;
-- drop table Countries;
