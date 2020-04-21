import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1587505942723
  implements MigrationInterface {
  // O que deve ser feito na execução do migration
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            // Gerar campo ID de forma automática como sendo um uuid
            generationStrategy: 'uuid',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  // Desfazer o que foi feito no método up
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
