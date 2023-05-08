import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMedicosHitos1677254449705
  implements MigrationInterface
{
  name = 'CreateTableMedicosHitos1677254449705';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medicos_hitos',
        columns: [
          {
            name: 'pk_medico_hito',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único de la relación méidco-hito',
          },
          {
            name: 'fk_medico',
            type: 'varchar',
            length: '50',
            isNullable: false,
            comment: 'Llave foránea del médico',
          },
          {
            name: 'fk_hito',
            type: 'int',
            isNullable: false,
            comment: 'Llave foránea del hito',
          },
          {
            name: 'fecha',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'creado_el',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
            precision: 3,
          },
          {
            name: 'actualizado_el',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
            precision: 3,
          },
          {
            name: 'eliminado_el',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('medicos_hitos', true);
  }
}
