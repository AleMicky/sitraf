import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAgencias1788024795890 implements MigrationInterface {
    name = 'CreateAgencias1788024795890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ope"."tagencias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "codigo" character varying(20) NOT NULL, "nombre" character varying(100) NOT NULL, "direccion" character varying(150), "telefono" character varying(30), "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3fdbf072b96dae4a058ba6c95a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "uk_agencias_codigo" ON "ope"."tagencias"  ("codigo") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "ope"."uk_agencias_codigo"`);
        await queryRunner.query(`DROP TABLE "ope"."tagencias"`);
    }

}
