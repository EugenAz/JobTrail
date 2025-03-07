import { MigrationInterface, QueryRunner } from 'typeorm';

export class NotNullableUserIds1739882465699 implements MigrationInterface {
  name = 'NotNullableUserIds1739882465699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "companies" ALTER COLUMN user_id SET NOT NULL;
      ALTER TABLE "campaigns" ALTER COLUMN user_id SET NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "companies" ALTER COLUMN user_id DROP NOT NULL;
      ALTER TABLE "campaigns" ALTER COLUMN user_id DROP NOT NULL;
    `);
  }
}
