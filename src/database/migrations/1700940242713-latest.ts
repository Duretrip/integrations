import { MigrationInterface, QueryRunner } from "typeorm";

export class Latest1700940242713 implements MigrationInterface {
    name = 'Latest1700940242713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "airports" ("id" SERIAL NOT NULL, "icaoCode" character(4), "iataCode" character(3), "name" character varying(50), "city" character varying(50), "country" character varying(50), "latDeg" integer, "latMin" integer, "latSec" integer, "latDir" character(1), "lonDeg" integer, "lonMin" integer, "lonSec" integer, "lonDir" character(1), "altitude" integer, "latDecimal" double precision, "lonDecimal" double precision, CONSTRAINT "PK_507127316cedb7ec7447d0cb3d7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "airports"`);
    }

}
