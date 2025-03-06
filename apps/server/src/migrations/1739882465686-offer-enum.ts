import { MigrationInterface, QueryRunner } from 'typeorm';

export class OfferEnum1739882465686 implements MigrationInterface {
  name = 'OfferEnum1739882465686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TYPE applications_status_enum ADD VALUE 'offer';
      ALTER TYPE applications_status_enum ADD VALUE 'ghosted';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE applications_status_enum_old AS ENUM ('open', 'rejected', 'closed', 'expired', 'in_progress');
      ALTER TABLE applications ALTER COLUMN status TYPE applications_status_enum_old USING status::text::applications_status_enum_old;
      DROP TYPE applications_status_enum;
      ALTER TYPE applications_status_enum_old RENAME TO applications_status_enum;
    `);
  }
}
