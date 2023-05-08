import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableHitos1677197171853 implements MigrationInterface {
  name = 'CreateTableHitos1677197171853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'hitos',
        columns: [
          {
            name: 'pk_hito',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único del hito',
          },
          {
            name: 'pk_tmp',
            type: 'int',
            isNullable: false,
            isUnique: true,
            comment:
              'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
          },
          {
            name: 'hito',
            type: 'varchar',
            length: '100',
            isNullable: false,
            comment: 'Nombre del hito',
          },
          {
            name: 'metrica',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'estado',
            type: 'smallint',
            default: '1',
            isNullable: false,
          },
          {
            name: 'grupo',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'icono',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'color',
            type: 'varchar',
            length: '7',
            isNullable: true,
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
    await queryRunner.dropTable('hitos', true);
  }
}
