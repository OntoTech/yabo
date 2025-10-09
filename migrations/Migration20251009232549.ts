import { Migration } from '@mikro-orm/migrations';

export class Migration20251009232549 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "idx" varchar(255) null, "is_deleted" boolean null default false, "deleted_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, "object_guid" varchar(255) not null, "username" varchar(255) not null, "email" varchar(255) not null, "first_name" varchar(255) not null, "middle_name" varchar(255) not null, "family_name" varchar(255) not null, "uid" varchar(255) not null, "sub" varchar(255) not null, "created_by_id" int null);`);
    this.addSql(`create index "user_id_index" on "user" ("id");`);
    this.addSql(`create index "user_idx_index" on "user" ("idx");`);
    this.addSql(`create index "user_object_guid_index" on "user" ("object_guid");`);
    this.addSql(`alter table "user" add constraint "user_object_guid_unique" unique ("object_guid");`);
    this.addSql(`create index "user_username_index" on "user" ("username");`);
    this.addSql(`alter table "user" add constraint "user_username_unique" unique ("username");`);
    this.addSql(`create index "user_email_index" on "user" ("email");`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "schema" ("id" serial primary key, "idx" varchar(255) null, "is_deleted" boolean null default false, "deleted_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "description" text not null, "created_by_id" int null);`);
    this.addSql(`create index "schema_id_index" on "schema" ("id");`);
    this.addSql(`create index "schema_idx_index" on "schema" ("idx");`);
    this.addSql(`create index "schema_name_index" on "schema" ("name");`);
    this.addSql(`create index "schema_created_by_id_index" on "schema" ("created_by_id");`);

    this.addSql(`create table "role" ("id" serial primary key, "idx" varchar(255) null, "is_deleted" boolean null default false, "deleted_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "description" varchar(255) not null, "created_by_id" int null);`);
    this.addSql(`create index "role_id_index" on "role" ("id");`);
    this.addSql(`create index "role_idx_index" on "role" ("idx");`);
    this.addSql(`create index "role_name_index" on "role" ("name");`);
    this.addSql(`alter table "role" add constraint "role_name_unique" unique ("name");`);
    this.addSql(`create index "role_created_by_id_index" on "role" ("created_by_id");`);

    this.addSql(`create table "attribute_type" ("id" serial primary key, "idx" varchar(255) null, "is_deleted" boolean null default false, "deleted_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "created_by_id" int null);`);
    this.addSql(`create index "attribute_type_id_index" on "attribute_type" ("id");`);
    this.addSql(`create index "attribute_type_idx_index" on "attribute_type" ("idx");`);
    this.addSql(`create index "attribute_type_name_index" on "attribute_type" ("name");`);
    this.addSql(`alter table "attribute_type" add constraint "attribute_type_name_unique" unique ("name");`);
    this.addSql(`create index "attribute_type_created_by_id_index" on "attribute_type" ("created_by_id");`);

    this.addSql(`create table "attribute" ("id" serial primary key, "idx" varchar(255) null, "is_deleted" boolean null default false, "deleted_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, "properties" jsonb not null, "created_by_id" int null);`);
    this.addSql(`create index "attribute_id_index" on "attribute" ("id");`);
    this.addSql(`create index "attribute_idx_index" on "attribute" ("idx");`);
    this.addSql(`create index "attribute_created_by_id_index" on "attribute" ("created_by_id");`);

    this.addSql(`create table "schema_attributes" ("schema_id" int not null, "attribute_id" int not null, constraint "schema_attributes_pkey" primary key ("schema_id", "attribute_id"));`);

    this.addSql(`create table "application_type" ("id" serial primary key, "idx" varchar(255) null, "is_deleted" boolean null default false, "deleted_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "created_by_id" int null);`);
    this.addSql(`create index "application_type_id_index" on "application_type" ("id");`);
    this.addSql(`create index "application_type_idx_index" on "application_type" ("idx");`);
    this.addSql(`create index "application_type_name_index" on "application_type" ("name");`);
    this.addSql(`alter table "application_type" add constraint "application_type_name_unique" unique ("name");`);
    this.addSql(`create index "application_type_created_by_id_index" on "application_type" ("created_by_id");`);

    this.addSql(`create table "application" ("id" serial primary key, "idx" varchar(255) null, "is_deleted" boolean null default false, "deleted_at" timestamptz null, "created_at" timestamptz null, "updated_at" timestamptz null, "name" varchar(255) not null, "description" varchar(255) not null, "type_id" int not null, "created_by_id" int null);`);
    this.addSql(`create index "application_id_index" on "application" ("id");`);
    this.addSql(`create index "application_idx_index" on "application" ("idx");`);
    this.addSql(`create index "application_created_by_id_index" on "application" ("created_by_id");`);

    this.addSql(`create table "schema_applications" ("id" serial primary key, "schema_id" int not null, "application_id" int not null);`);

    this.addSql(`create table "application_roles" ("application_id" int not null, "role_id" int not null, constraint "application_roles_pkey" primary key ("application_id", "role_id"));`);

    this.addSql(`create table "application_children" ("id" serial primary key, "application_1_id" int not null, "application_2_id" int not null);`);

    this.addSql(`create table "application_attributes" ("application_id" int not null, "attribute_id" int not null, constraint "application_attributes_pkey" primary key ("application_id", "attribute_id"));`);

    this.addSql(`create table "user_roles" ("user_id" int not null, "role_id" int not null, constraint "user_roles_pkey" primary key ("user_id", "role_id"));`);

    this.addSql(`alter table "user" add constraint "user_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "schema" add constraint "schema_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "role" add constraint "role_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "attribute_type" add constraint "attribute_type_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "attribute" add constraint "attribute_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "schema_attributes" add constraint "schema_attributes_schema_id_foreign" foreign key ("schema_id") references "schema" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "schema_attributes" add constraint "schema_attributes_attribute_id_foreign" foreign key ("attribute_id") references "attribute" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "application_type" add constraint "application_type_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "application" add constraint "application_type_id_foreign" foreign key ("type_id") references "application_type" ("id") on update cascade;`);
    this.addSql(`alter table "application" add constraint "application_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "schema_applications" add constraint "schema_applications_schema_id_foreign" foreign key ("schema_id") references "schema" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "schema_applications" add constraint "schema_applications_application_id_foreign" foreign key ("application_id") references "application" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "application_roles" add constraint "application_roles_application_id_foreign" foreign key ("application_id") references "application" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "application_roles" add constraint "application_roles_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "application_children" add constraint "application_children_application_1_id_foreign" foreign key ("application_1_id") references "application" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "application_children" add constraint "application_children_application_2_id_foreign" foreign key ("application_2_id") references "application" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "application_attributes" add constraint "application_attributes_application_id_foreign" foreign key ("application_id") references "application" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "application_attributes" add constraint "application_attributes_attribute_id_foreign" foreign key ("attribute_id") references "attribute" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "user_roles" add constraint "user_roles_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "user_roles" add constraint "user_roles_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_created_by_id_foreign";`);

    this.addSql(`alter table "schema" drop constraint "schema_created_by_id_foreign";`);

    this.addSql(`alter table "role" drop constraint "role_created_by_id_foreign";`);

    this.addSql(`alter table "attribute_type" drop constraint "attribute_type_created_by_id_foreign";`);

    this.addSql(`alter table "attribute" drop constraint "attribute_created_by_id_foreign";`);

    this.addSql(`alter table "application_type" drop constraint "application_type_created_by_id_foreign";`);

    this.addSql(`alter table "application" drop constraint "application_created_by_id_foreign";`);

    this.addSql(`alter table "user_roles" drop constraint "user_roles_user_id_foreign";`);

    this.addSql(`alter table "schema_attributes" drop constraint "schema_attributes_schema_id_foreign";`);

    this.addSql(`alter table "schema_applications" drop constraint "schema_applications_schema_id_foreign";`);

    this.addSql(`alter table "application_roles" drop constraint "application_roles_role_id_foreign";`);

    this.addSql(`alter table "user_roles" drop constraint "user_roles_role_id_foreign";`);

    this.addSql(`alter table "schema_attributes" drop constraint "schema_attributes_attribute_id_foreign";`);

    this.addSql(`alter table "application_attributes" drop constraint "application_attributes_attribute_id_foreign";`);

    this.addSql(`alter table "application" drop constraint "application_type_id_foreign";`);

    this.addSql(`alter table "schema_applications" drop constraint "schema_applications_application_id_foreign";`);

    this.addSql(`alter table "application_roles" drop constraint "application_roles_application_id_foreign";`);

    this.addSql(`alter table "application_children" drop constraint "application_children_application_1_id_foreign";`);

    this.addSql(`alter table "application_children" drop constraint "application_children_application_2_id_foreign";`);

    this.addSql(`alter table "application_attributes" drop constraint "application_attributes_application_id_foreign";`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "schema" cascade;`);

    this.addSql(`drop table if exists "role" cascade;`);

    this.addSql(`drop table if exists "attribute_type" cascade;`);

    this.addSql(`drop table if exists "attribute" cascade;`);

    this.addSql(`drop table if exists "schema_attributes" cascade;`);

    this.addSql(`drop table if exists "application_type" cascade;`);

    this.addSql(`drop table if exists "application" cascade;`);

    this.addSql(`drop table if exists "schema_applications" cascade;`);

    this.addSql(`drop table if exists "application_roles" cascade;`);

    this.addSql(`drop table if exists "application_children" cascade;`);

    this.addSql(`drop table if exists "application_attributes" cascade;`);

    this.addSql(`drop table if exists "user_roles" cascade;`);
  }

}
