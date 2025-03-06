import { MigrationInterface, QueryRunner } from 'typeorm';

export class Authentication1739882465685 implements MigrationInterface {
  name = 'Authentication1739882465685';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE public.users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            first_name VARCHAR(20) NULL,
            last_name VARCHAR(20) NULL
        );
    `);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD COLUMN "user_id" UUID NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "FK_companies_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD COLUMN "user_id" UUID NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" ADD CONSTRAINT "FK_campaigns_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
    await queryRunner.query(
      `ALTER TABLE "campaigns" DROP CONSTRAINT "FK_campaigns_user"`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "FK_companies_user"`
    );
    await queryRunner.query(
      `ALTER TABLE "campaigns" DROP COLUMN IF EXISTS "user_id";`
    );
    await queryRunner.query(
      `ALTER TABLE "companies" DROP COLUMN IF EXISTS "user_id";`
    );
  }
}
