import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1667797928020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" (
        "userId" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "firstName" VARCHAR(100) NOT NULL,
        "lastName" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) NOT NULL,
        "password" VARCHAR(100) NOT NULL,
        "createdAt" TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
