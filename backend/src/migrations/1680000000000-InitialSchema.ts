import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1680000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "username" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" character varying NOT NULL DEFAULT 'worker',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_user_username" UNIQUE ("username"),
        CONSTRAINT "PK_user" PRIMARY KEY ("id")
      );
    `);
    // se crean tablas para Animal, Product, Movement, Production, Sale, Hive
    await queryRunner.query(`
      CREATE TABLE "animal" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "especie" character varying NOT NULL,
        "fechaIngreso" date,
        "edad" character varying,
        "peso" double precision,
        "estado" character varying NOT NULL DEFAULT 'saludable',
        "cantidad" integer NOT NULL DEFAULT 1,
        "observaciones" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_animal" PRIMARY KEY ("id")
      );
    `);
    await queryRunner.query(`
      CREATE TABLE "hive" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "nombre" character varying NOT NULL,
        "ultimaProduccionLitros" double precision NOT NULL DEFAULT 0,
        "ubicacion" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_hive" PRIMARY KEY ("id")
      );
    `);
    await queryRunner.query(`
      CREATE TABLE "product" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tipo" character varying NOT NULL,
        "procedencia" character varying,
        "peso" double precision,
        "fechaSacrificio" date,
        "fechaCaducidad" date,
        "cantidadHuevos" integer,
        "fechaRecoleccion" date,
        "lote" character varying,
        "colmenaOrigen" character varying,
        "cantidadMiel" double precision,
        "fechaExtraccion" date,
        "pureza" character varying,
        "observaciones" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_product" PRIMARY KEY ("id")
      );
    `);
    await queryRunner.query(`
      CREATE TABLE "movement" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tipo" character varying NOT NULL,
        "especie" character varying NOT NULL,
        "cantidad" integer NOT NULL DEFAULT 0,
        "notas" text,
        "fecha" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_movement" PRIMARY KEY ("id")
      );
    `);
    await queryRunner.query(`
      CREATE TABLE "production" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tipo" character varying NOT NULL,
        "fecha" date NOT NULL,
        "cantidadHuevos" integer,
        "cantidadMiel" double precision,
        "gananciaPeso" double precision,
        "referencia" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_production" PRIMARY KEY ("id")
      );
    `);
    await queryRunner.query(`
      CREATE TABLE "sale" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tipo" character varying NOT NULL,
        "referenciaId" character varying NOT NULL,
        "precioTotal" double precision NOT NULL,
        "cantidad" integer NOT NULL DEFAULT 1,
        "fecha" TIMESTAMP NOT NULL DEFAULT now(),
        "notas" text,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_sale" PRIMARY KEY ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sale";`);
    await queryRunner.query(`DROP TABLE "production";`);
    await queryRunner.query(`DROP TABLE "movement";`);
    await queryRunner.query(`DROP TABLE "product";`);
    await queryRunner.query(`DROP TABLE "hive";`);
    await queryRunner.query(`DROP TABLE "animal";`);
    await queryRunner.query(`DROP TABLE "user";`);
  }
}