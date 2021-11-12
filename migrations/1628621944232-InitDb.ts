import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1628621944232 implements MigrationInterface {
  name = 'InitDb1628621944232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `example-name`.`mocks` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `example-name`.`mocks`');
  }
}
