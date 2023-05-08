import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableDepartamentos1677151364055
  implements MigrationInterface
{
  name = 'CreateTableDepartamentos1677151364055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'departamentos',
        columns: [
          {
            name: 'pk_departamento',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único del departamento',
          },
          {
            name: 'pk_tmp',
            type: 'int',
            isUnique: true,
            isNullable: false,
            comment:
              'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
          },
          {
            name: 'departamento',
            type: 'varchar',
            length: '45',
            isNullable: false,
            comment: 'Nombre del departamento',
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
    await queryRunner.dropTable('departamentos', true);
  }
}
