create table django_migrations
(
	id serial not null
		constraint django_migrations_pkey
			primary key,
	app varchar(255) not null,
	name varchar(255) not null,
	applied timestamp with time zone not null
);

alter table django_migrations owner to admin;

create table django_content_type
(
	id serial not null
		constraint django_content_type_pkey
			primary key,
	app_label varchar(100) not null,
	model varchar(100) not null,
	constraint django_content_type_app_label_model_76bd3d3b_uniq
		unique (app_label, model)
);

alter table django_content_type owner to admin;

create table auth_permission
(
	id serial not null
		constraint auth_permission_pkey
			primary key,
	name varchar(255) not null,
	content_type_id integer not null
		constraint auth_permission_content_type_id_2f476e4b_fk_django_co
			references django_content_type
				deferrable initially deferred,
	codename varchar(100) not null,
	constraint auth_permission_content_type_id_codename_01ab375a_uniq
		unique (content_type_id, codename)
);

alter table auth_permission owner to admin;

create index auth_permission_content_type_id_2f476e4b
	on auth_permission (content_type_id);

create table auth_group
(
	id serial not null
		constraint auth_group_pkey
			primary key,
	name varchar(150) not null
		constraint auth_group_name_key
			unique
);

alter table auth_group owner to admin;

create index auth_group_name_a6ea08ec_like
	on auth_group (name);

create table auth_group_permissions
(
	id serial not null
		constraint auth_group_permissions_pkey
			primary key,
	group_id integer not null
		constraint auth_group_permissions_group_id_b120cbf9_fk_auth_group_id
			references auth_group
				deferrable initially deferred,
	permission_id integer not null
		constraint auth_group_permissio_permission_id_84c5c92e_fk_auth_perm
			references auth_permission
				deferrable initially deferred,
	constraint auth_group_permissions_group_id_permission_id_0cd325b0_uniq
		unique (group_id, permission_id)
);

alter table auth_group_permissions owner to admin;

create index auth_group_permissions_group_id_b120cbf9
	on auth_group_permissions (group_id);

create index auth_group_permissions_permission_id_84c5c92e
	on auth_group_permissions (permission_id);

create table auth_user
(
	id serial not null
		constraint auth_user_pkey
			primary key,
	password varchar(128) not null,
	last_login timestamp with time zone,
	is_superuser boolean not null,
	username varchar(150) not null
		constraint auth_user_username_key
			unique,
	first_name varchar(30) not null,
	last_name varchar(150) not null,
	email varchar(254) not null,
	is_staff boolean not null,
	is_active boolean not null,
	date_joined timestamp with time zone not null
);

alter table auth_user owner to admin;

create index auth_user_username_6821ab7c_like
	on auth_user (username);

create table auth_user_groups
(
	id serial not null
		constraint auth_user_groups_pkey
			primary key,
	user_id integer not null
		constraint auth_user_groups_user_id_6a12ed8b_fk_auth_user_id
			references auth_user
				deferrable initially deferred,
	group_id integer not null
		constraint auth_user_groups_group_id_97559544_fk_auth_group_id
			references auth_group
				deferrable initially deferred,
	constraint auth_user_groups_user_id_group_id_94350c0c_uniq
		unique (user_id, group_id)
);

alter table auth_user_groups owner to admin;

create index auth_user_groups_user_id_6a12ed8b
	on auth_user_groups (user_id);

create index auth_user_groups_group_id_97559544
	on auth_user_groups (group_id);

create table auth_user_user_permissions
(
	id serial not null
		constraint auth_user_user_permissions_pkey
			primary key,
	user_id integer not null
		constraint auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id
			references auth_user
				deferrable initially deferred,
	permission_id integer not null
		constraint auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm
			references auth_permission
				deferrable initially deferred,
	constraint auth_user_user_permissions_user_id_permission_id_14a6b632_uniq
		unique (user_id, permission_id)
);

alter table auth_user_user_permissions owner to admin;

create index auth_user_user_permissions_user_id_a95ead1b
	on auth_user_user_permissions (user_id);

create index auth_user_user_permissions_permission_id_1fbb5f2c
	on auth_user_user_permissions (permission_id);

create table django_admin_log
(
	id serial not null
		constraint django_admin_log_pkey
			primary key,
	action_time timestamp with time zone not null,
	object_id text,
	object_repr varchar(200) not null,
	action_flag smallint not null
		constraint django_admin_log_action_flag_check
			check (action_flag >= 0),
	change_message text not null,
	content_type_id integer
		constraint django_admin_log_content_type_id_c4bce8eb_fk_django_co
			references django_content_type
				deferrable initially deferred,
	user_id integer not null
		constraint django_admin_log_user_id_c564eba6_fk_auth_user_id
			references auth_user
				deferrable initially deferred
);

alter table django_admin_log owner to admin;

create index django_admin_log_content_type_id_c4bce8eb
	on django_admin_log (content_type_id);

create index django_admin_log_user_id_c564eba6
	on django_admin_log (user_id);

create table django_session
(
	session_key varchar(40) not null
		constraint django_session_pkey
			primary key,
	session_data text not null,
	expire_date timestamp with time zone not null
);

alter table django_session owner to admin;

create index django_session_session_key_c0390e0f_like
	on django_session (session_key);

create index django_session_expire_date_a5c62663
	on django_session (expire_date);

create table "Countries"
(
	"id_countryCode" varchar(5) not null
		constraint "Countries_pkey"
			primary key,
	countryname varchar(30) not null
);

alter table "Countries" owner to admin;

create index "Countries_id_countryCode_bfcd797e_like"
	on "Countries" ("id_countryCode");

create table "Persons"
(
	id_person serial not null
		constraint "Persons_pkey"
			primary key,
	"lastName" varchar(50) not null,
	"firstName" varchar(30) not null,
	alias varchar(20)
		constraint unique_alias
			unique,
	"birthDate" date not null,
	email varchar(254) not null
);

alter table "Persons" owner to admin;

create table "PersonReviews"
(
	"id_personReview" serial not null
		constraint "PersonReviews_pkey"
			primary key,
	stars integer not null,
	comment text,
	id_person integer not null
		constraint "PersonReviews_id_person_abd10778_fk_Persons_id_person"
			references "Persons"
				deferrable initially deferred
);

alter table "PersonReviews" owner to admin;

create index "PersonReviews_id_person_abd10778"
	on "PersonReviews" (id_person);

create table "Tools"
(
	id_tool serial not null
		constraint "Tools_pkey"
			primary key,
	"toolName" varchar(30) not null,
	"toolDescription" text,
	"toolPrice" numeric(8,2),
	id_person integer not null
		constraint "Tools_id_person_f2cc1cec_fk_Persons_id_person"
			references "Persons"
				deferrable initially deferred
);

alter table "Tools" owner to admin;

create index "Tools_id_person_f2cc1cec"
	on "Tools" (id_person);

create table "Towns"
(
	id_town serial not null
		constraint "Towns_pkey"
			primary key,
	"postCode" integer not null,
	"townName" varchar(30) not null,
	"id_countryCode" varchar(5) not null
		constraint "Towns_id_countryCode_f893d914_fk_Countries_id_countryCode"
			references "Countries"
				deferrable initially deferred
);

alter table "Towns" owner to admin;

create table "Groups"
(
	"id_groupName" varchar(50) not null
		constraint "Groups_pkey"
			primary key,
	"groupType" varchar(7),
	"groupRange" integer not null,
	id_town integer not null
		constraint "Groups_id_town_6a4bccf1_fk_Towns_id_town"
			references "Towns"
				deferrable initially deferred
);

alter table "Groups" owner to admin;

create index "Groups_id_groupName_e3983c6c_like"
	on "Groups" ("id_groupName");

create index "Groups_id_town_6a4bccf1"
	on "Groups" (id_town);

create table "GroupsMembers"
(
	id_person integer not null
		constraint "GroupsMembers_pkey"
			primary key
		constraint "GroupsMembers_id_person_9b2a77f0_fk_Persons_id_person"
			references "Persons"
				deferrable initially deferred,
	"groupAdmin" boolean not null,
	"id_groupName" varchar(50) not null
		constraint "GroupsMembers_id_groupName_8a5f5608_fk_Groups_id_groupName"
			references "Groups"
				deferrable initially deferred,
	constraint "GroupsMembers_id_person_id_groupName_61c53644_uniq"
		unique (id_person, "id_groupName")
);

alter table "GroupsMembers" owner to admin;

create index "GroupsMembers_id_groupName_8a5f5608"
	on "GroupsMembers" ("id_groupName");

create index "GroupsMembers_id_groupName_8a5f5608_like"
	on "GroupsMembers" ("id_groupName");

create table "ToolsGroups"
(
	id_tool integer not null
		constraint "ToolsGroups_pkey"
			primary key
		constraint "ToolsGroups_id_tool_3733cf94_fk_Tools_id_tool"
			references "Tools"
				deferrable initially deferred,
	"id_groupName" varchar(50) not null
		constraint "ToolsGroups_id_groupName_866ec969_fk_Groups_id_groupName"
			references "Groups"
				deferrable initially deferred,
	constraint "ToolsGroups_id_tool_id_groupName_5d4d3903_uniq"
		unique (id_tool, "id_groupName")
);

alter table "ToolsGroups" owner to admin;

create index "ToolsGroups_id_groupName_866ec969"
	on "ToolsGroups" ("id_groupName");

create index "ToolsGroups_id_groupName_866ec969_like"
	on "ToolsGroups" ("id_groupName");

create index "Towns_id_countryCode_f893d914"
	on "Towns" ("id_countryCode");

create index "Towns_id_countryCode_f893d914_like"
	on "Towns" ("id_countryCode");

create table "ToolReviews"
(
	"id_toolReview" serial not null
		constraint "ToolReviews_pkey"
			primary key,
	stars integer not null,
	comment text,
	id_tool integer not null
		constraint "ToolReviews_id_tool_225eea10_fk_Tools_id_tool"
			references "Tools"
				deferrable initially deferred
);

alter table "ToolReviews" owner to admin;

create index "ToolReviews_id_tool_225eea10"
	on "ToolReviews" (id_tool);

create table "ToolImages"
(
	"id_toolImage" serial not null
		constraint "ToolImages_pkey"
			primary key,
	image varchar(100) not null,
	id_tool integer not null
		constraint "ToolImages_id_tool_ca71d0e5_fk_Tools_id_tool"
			references "Tools"
				deferrable initially deferred
);

alter table "ToolImages" owner to admin;

create index "ToolImages_id_tool_ca71d0e5"
	on "ToolImages" (id_tool);

create table "PersonsTowns"
(
	"id_personsTowns" serial not null
		constraint "PersonsTowns_pkey"
			primary key,
	id_person integer not null
		constraint "PersonsTowns_id_person_18ad9485_fk_Persons_id_person"
			references "Persons"
				deferrable initially deferred,
	id_town integer not null
		constraint "PersonsTowns_id_town_0812a5af_fk_Towns_id_town"
			references "Towns"
				deferrable initially deferred
);

alter table "PersonsTowns" owner to admin;

create index "PersonsTowns_id_person_18ad9485"
	on "PersonsTowns" (id_person);

create index "PersonsTowns_id_town_0812a5af"
	on "PersonsTowns" (id_town);

