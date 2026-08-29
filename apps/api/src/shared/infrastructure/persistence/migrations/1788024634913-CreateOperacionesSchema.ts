import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOperacionesSchema1788024634913 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE SCHEMA IF NOT EXISTS ope
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP SCHEMA IF EXISTS ope
    `);
  }
}
