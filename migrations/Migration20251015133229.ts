import { Migration } from '@mikro-orm/migrations';

export class Migration20251015133229 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "attribute" add column "type_id" int not null;`);
    this.addSql(`alter table "attribute" add constraint "attribute_type_id_foreign" foreign key ("type_id") references "attribute_type" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "attribute" drop constraint "attribute_type_id_foreign";`);

    this.addSql(`alter table "attribute" drop column "type_id";`);
  }

}
