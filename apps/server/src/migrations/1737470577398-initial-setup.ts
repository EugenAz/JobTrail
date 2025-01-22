import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup1737470577398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE public.applications_status_enum AS ENUM (
        'open',
        'rejected',
        'closed',
        'expired'
      );

      CREATE TABLE public.applications (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        date date NOT NULL,
        role_name character varying(100) NOT NULL,
        status public.applications_status_enum DEFAULT 'open'::public.applications_status_enum NOT NULL,
        notes text NOT NULL,
        campaign_id uuid,
        company_id uuid,
        status_changed_at date,
        link character varying(255)
      );

      CREATE TABLE public.campaigns (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        name character varying(100) NOT NULL,
        date_start date NOT NULL,
        date_end date
      );

      CREATE TABLE public.companies (
        id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
        name character varying(50) NOT NULL
      );

      ALTER TABLE ONLY public.applications
        ADD CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY (id);
      ALTER TABLE ONLY public.companies
        ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY (id);
      ALTER TABLE ONLY public.campaigns
        ADD CONSTRAINT "PK_0ce34d26e7f2eb316a3a592cdc4" PRIMARY KEY (id);

      ALTER TABLE ONLY public.applications
        ADD CONSTRAINT "FK_cb7a3b4b25f960e895d3213a010" FOREIGN KEY (company_id) REFERENCES public.companies(id);
      ALTER TABLE ONLY public.applications
        ADD CONSTRAINT "FK_e659cf28f167dcd4ed4148c601f" FOREIGN KEY (campaign_id) REFERENCES public.campaigns(id);


      ALTER TABLE ONLY public.companies
        ADD CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE (name);
      ALTER TABLE ONLY public.campaigns
        ADD CONSTRAINT "UQ_e290ca6f46908d64b270de65471" UNIQUE (name);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO postgres;
      GRANT ALL ON SCHEMA public TO public;
    `);
  }
}
