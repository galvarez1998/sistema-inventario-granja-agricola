import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMoneyTypesAndSoftDelete1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Change money types from double precision to numeric/decimal
    await queryRunner.query(`
      ALTER TABLE "sale"
      ALTER COLUMN "precioTotal" TYPE NUMERIC(10,2);
    `);

    // Add soft delete columns
    await queryRunner.query(`
      ALTER TABLE "animal"
      ADD COLUMN "deletedAt" TIMESTAMP NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "product"
      ADD COLUMN "deletedAt" TIMESTAMP NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "deletedAt" TIMESTAMP NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert money types
    await queryRunner.query(`
      ALTER TABLE "sale"
      ALTER COLUMN "precioTotal" TYPE double precision;
    `);

    // Remove soft delete columns
    await queryRunner.query(`
      ALTER TABLE "animal"
      DROP COLUMN "deletedAt";
    `);

    await queryRunner.query(`
      ALTER TABLE "product"
      DROP COLUMN "deletedAt";
    `);

    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN "deletedAt";
    `);
  }
}
