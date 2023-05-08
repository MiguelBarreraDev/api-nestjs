import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableDistritos1680036445598 implements MigrationInterface {
  name = 'CreateTableDistritos1680036445598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'distritos',
        columns: [
          {
            name: 'pk_distrito',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único del distrito',
          },
          {
            name: 'pk_tmp',
            type: 'int',
            isNullable: true,
            isUnique: true,
            comment:
              'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
          },
          {
            name: 'fk_provincia',
            type: 'uuid',
            isNullable: true,
            isUnique: false,
            comment:
              'Hace referencia a la provincia donde se encontrará el distrito',
          },
          {
            name: 'fk_tmp_provincia',
            type: 'int',
            isNullable: true,
            isUnique: false,
            comment:
              'Contiene de forma temporal las fk antiguas de provincia, para ser actualizadas por las fk en formato UUID',
          },
          {
            name: 'distrito',
            type: 'varchar',
            length: '45',
            isNullable: false,
            comment: 'Nombre del distrito',
          },
          {
            name: 'auto_service',
            type: 'smallint',
            default: '0',
            isNullable: true,
          },
          {
            name: 'ubigeo',
            type: 'char',
            length: '8',
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
    await queryRunner.dropTable('distritos', true);
  }
}
