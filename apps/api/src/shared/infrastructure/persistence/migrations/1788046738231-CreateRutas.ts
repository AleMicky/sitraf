import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRutas1788046738231 implements MigrationInterface {
    name = 'CreateRutas1788046738231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ope"."trutas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "codigo" character varying(30) NOT NULL, "nombre" character varying(150) NOT NULL, "agencia_origen_id" uuid NOT NULL, "agencia_destino_id" uuid NOT NULL, "distancia_km" numeric(10,2), "duracion_minutos" integer, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_15789e24dc7e6296d6f24e8c0a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_rutas_agencia_destino" ON "ope"."trutas"  ("agencia_destino_id") `);
        await queryRunner.query(`CREATE INDEX "idx_rutas_agencia_origen" ON "ope"."trutas"  ("agencia_origen_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "uk_rutas_codigo" ON "ope"."trutas"  ("codigo") `);
        await queryRunner.query(`CREATE TABLE "ope"."truta_paradas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ruta_id" uuid NOT NULL, "agencia_id" uuid NOT NULL, "orden" integer NOT NULL, "distancia_acumulada_km" numeric(10,2), "tiempo_estimado_minutos" integer, CONSTRAINT "PK_1faad2c794329fc86c526ef022d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_ruta_paradas_agencia" ON "ope"."truta_paradas"  ("agencia_id") `);
        await queryRunner.query(`CREATE INDEX "idx_ruta_paradas_ruta" ON "ope"."truta_paradas"  ("ruta_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "uk_ruta_paradas_ruta_orden" ON "ope"."truta_paradas"  ("ruta_id", "orden") `);
        await queryRunner.query(`ALTER TABLE "ope"."trutas" ADD CONSTRAINT "fk_rutas_agencia_origen" FOREIGN KEY ("agencia_origen_id") REFERENCES "ope"."tagencias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ope"."trutas" ADD CONSTRAINT "fk_rutas_agencia_destino" FOREIGN KEY ("agencia_destino_id") REFERENCES "ope"."tagencias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ope"."truta_paradas" ADD CONSTRAINT "fk_ruta_paradas_ruta" FOREIGN KEY ("ruta_id") REFERENCES "ope"."trutas"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ope"."truta_paradas" ADD CONSTRAINT "fk_ruta_paradas_agencia" FOREIGN KEY ("agencia_id") REFERENCES "ope"."tagencias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ope"."truta_paradas" DROP CONSTRAINT "fk_ruta_paradas_agencia"`);
        await queryRunner.query(`ALTER TABLE "ope"."truta_paradas" DROP CONSTRAINT "fk_ruta_paradas_ruta"`);
        await queryRunner.query(`ALTER TABLE "ope"."trutas" DROP CONSTRAINT "fk_rutas_agencia_destino"`);
        await queryRunner.query(`ALTER TABLE "ope"."trutas" DROP CONSTRAINT "fk_rutas_agencia_origen"`);
        await queryRunner.query(`DROP INDEX "ope"."uk_ruta_paradas_ruta_orden"`);
        await queryRunner.query(`DROP INDEX "ope"."idx_ruta_paradas_ruta"`);
        await queryRunner.query(`DROP INDEX "ope"."idx_ruta_paradas_agencia"`);
        await queryRunner.query(`DROP TABLE "ope"."truta_paradas"`);
        await queryRunner.query(`DROP INDEX "ope"."uk_rutas_codigo"`);
        await queryRunner.query(`DROP INDEX "ope"."idx_rutas_agencia_origen"`);
        await queryRunner.query(`DROP INDEX "ope"."idx_rutas_agencia_destino"`);
        await queryRunner.query(`DROP TABLE "ope"."trutas"`);
    }

}
