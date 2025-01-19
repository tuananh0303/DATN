create table role (
	id smallserial primary key,
	role_name varchar(255) not null,
	unique(role_name)
);

create table people(
	id uuid default gen_random_uuid() primary key,
	first_name varchar(255) not null,
	last_name varchar(255) not null,
	email varchar(255) not null,
	password varchar(255) not null,
	phone_number varchar(255) not null,
	created_at date default current_date not null,
	updated_at date default current_date not null,
	gender varchar,
	dob date,
	bank_account varchar(255),
	role_id  smallserial not null,
	constraint fk_role
		foreign key(role_id) references role(id)
);

create table sport(
	id smallserial primary key,
	name varchar not null,
	unique(name)
);

create type approve_enum as enum('PEDDING', 'APPROVED', 'REJECTED');

create table facility(
	id uuid default gen_random_uuid() primary key,
	name varchar(255) not null,
	description varchar not null,
	location varchar not null,
	approve approve_enum default 'PEDDING' not null,
	is_closed boolean default false not null,
	created_at date default current_date not null,
	updated_at date default current_date not null,
	open_time date not null,
	close_time date not null,
	thumbnail varchar not null,
	avg_rating real default 0.0 not null,
	quatity_rating smallint default 0 not null,
	owner_id uuid not null,
	constraint fk_owner
		foreign key(owner_id) references people(id)
);

create table field(
	id smallserial primary key,
	name varchar(255) not null,
	approve approve_enum default 'PEDDING' not null,
	is_closed boolean default false not null,
	price real default 0.0 not null,
	created_at date default current_date,
	updated_at date default current_date,
	avg_rating real default 0.0 not null,
	quantity_rating smallint default 0 not null,
	dimension varchar(255) not null,
	facility_id uuid not null,
	constraint fk_facility
		foreign key(facility_id) references facility(id)
);

create table sport_field(
	sport_id smallserial not null,
	field_id smallserial not null,
	primary key(sport_id, field_id),
	constraint fk_sport
		foreign key(sport_id) references sport(id),
	constraint fk_field
		foreign key(field_id) references field(id)
);

create table image_facility(
	image varchar primary key,
	facility_id uuid not null,
	constraint fk_field
		foreign key(facility_id) references facility(id)
);

create table event(
	id smallserial primary key,
	title varchar(255) not null,
	description varchar not null,
	start_date date default current_date not null,
	end_date date default current_date not null,
	thumbnail varchar(255) not null,
	facility_id uuid not null,
	owner_id uuid not null,
	constraint fk_facility
		foreign key(facility_id) references facility(id),
	constraint fk_owner
		foreign key(owner_id) references people(id)
);

create table conversation(
	id smallserial primary key
);

create table message(
	id uuid default gen_random_uuid() primary key,
	content varchar not null,
	send_date date default current_date,
	conversation_id smallserial not null,
	user_id uuid not null,
	constraint fk_conversation
		foreign key(conversation_id) references conversation(id),
	constraint fk_user
		foreign key(user_id) references people(id)
);

create table participant(
	conversation_id smallserial not null,
	user_id uuid not null,
	primary key(conversation_id, user_id),
	constraint fk_conversation
		foreign key(conversation_id) references conversation(id),
	constraint fk_user
		foreign key(user_id) references people(id)
);

create type category_enum as enum('TIME', 'QUANTITY');

create table service(
	id smallserial primary key,
	name varchar(255) not null,
	category category_enum not null,
	common_price real default 0.0 not null,
	in_bussiness boolean default true not null,
	owner_id uuid not null,
	sport_id smallserial not null,
	constraint fk_owner
		foreign key(owner_id) references people(id),
	constraint fk_sport
		foreign key(sport_id) references sport(id)
);

create table service_of_facility(
	id smallserial primary key,
	in_business boolean default true not null,
	price real default 0.0 not null,
	avg_rating real default 0.0 not null,
	quantity_rating smallint default 0 not null,
	service_id smallserial not null,
	facility_id uuid not null,
	constraint fk_service
		foreign key(service_id) references service(id),
	constraint fk_facility
		foreign key(facility_id) references facility(id)
);

create table production(
	service_of_facility_id smallserial not null,
	name varchar(255) not null,
	amount smallint default 0 not null,
	primary key(service_of_facility_id, name),
	constraint fk_service_of_facility
		foreign key(service_of_facility_id) references service_of_facility(id)
);

create type booking_status as enum('PEDDING', 'SUCCESS', 'CANCEL');

create table booking(
	id smallserial primary key,
	start_time date default current_date not null,
	duration smallint default 0 not null,
	created_at date default current_date not null,
	status booking_status default 'PEDDING' not null,
	field_id smallserial not null,
	player_id uuid not null,
	constraint fk_field
		foreign key(field_id) references field(id),
	constraint fk_player
		foreign key(player_id) references people(id)
);

create table review(
	id smallserial primary key,
	rating smallint default 5 not null,
	comment varchar,
	date date default current_date not null,
	booking_id smallserial not null,
	player_id uuid not null,
	constraint fk_field
		foreign key(booking_id) references booking(id),
	constraint fk_user 
		foreign key(player_id) references people(id)
);


create table response(
	id smallserial primary key,
	comment varchar not null,
	review_id smallserial not null,
	owner_id uuid not null,
	constraint fk_review
		foreign key(review_id) references review(id),
	constraint fk_user
		foreign key(owner_id) references people(id)
);


create table booking_notification(
	id smallserial primary key,
	is_sucessful boolean default true not null,
	date date default current_date not null,
	is_seen boolean default false not null,
	owner_id uuid not null,
	booking_id smallserial not null,
	constraint fk_owner
		foreign key(owner_id) references people(id),
	constraint fk_booking
		foreign key(booking_id) references booking(id)
);

create table voucher(
	id smallserial primary key,
	name varchar(255) not null,
	code varchar(255) not null,
	discount_percentage real default 0.0 not null,
	start_date date default current_date not null,
	end_date date default current_date not null,
	amount smallint default 0 not null,
	remain smallint default 0 not null,
	status boolean default true not null, -- de hien thuc khi muon bo voucher 
	max_discount real not null,
	min_price real default 0.0 not null,
	facility_id uuid not null,
	owner_id uuid not null,
	constraint fk_facility
		foreign key(facility_id) references facility(id),
	constraint fk_owner
		foreign key (owner_id) references people(id)
);

create table admin_annoucement(
	id smallserial primary key,
	title varchar(255) not null,
	content varchar(255) not null,
	start_date date default current_date not null,
	end_date date default current_date  not null,
	admin_id uuid not null,
	constraint fk_admin
		foreign key(admin_id) references people(id)
);

create table admin_event(
	id smallserial primary key,
	title varchar(255) not null,
	start_date date default current_date not null,
	end_date date default current_date not null,
	thumbnail varchar(255) not null,
	description varchar(255) not null,
	admin_id uuid not null,
	constraint fk_admin
		foreign key(admin_id) references people(id)
);

create table admin_voucher(
	id smallserial primary key,
	name varchar(255) not null,
	code varchar(255) not null,
	start_date date default current_date not null,
	end_date date default current_date not null,
	min_price real default 0.0 not null,
	max_discount real not null,
	reamin smallint default 0 not null,
	amount smallint default 0 not null,
	discount_percentage real default 0.0 not null,
	status boolean default true not null,
	admin_id uuid not null,
	constraint fk_admin
		foreign key(admin_id) references people(id)
);

create table payment(
	id smallserial primary key,
	player_id uuid not null,
	owner_voucher_id smallserial not null,
	admin_voucher_id smallserial not null,
	booking_id smallserial not null,
	price real default 0.0 not null,
	final_price real default 0.0 not null,
	constraint fk_player
		foreign key(player_id) references people(id),
	constraint fk_owner_voucher
		foreign key(owner_voucher_id) references voucher(id),
	constraint fk_admin_voucher
		foreign key(admin_voucher_id) references admin_voucher(id),
	constraint fk_booking
		foreign key(booking_id) references booking(id)
);

create table book_service(
	booking_id smallserial not null,
	service_of_facility_id smallserial not null,
	amount smallint default 0 not null,
	primary key(booking_id, service_of_facility_id),
	constraint fk_booking
		foreign key(booking_id) references booking(id),
	constraint fk_service
		foreign key(service_of_facility_id) references service_of_facility(id)
);
