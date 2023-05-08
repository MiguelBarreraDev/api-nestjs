import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTiposContactos1677287841854
  implements MigrationInterface
{
  name = 'CreateTableTiposContactos1677287841854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tipos_contactos',
        columns: [
          {
            name: 'pk_tipo_contacto',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único del tipo de contacto',
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
            name: 'tipo_contacto',
            type: 'varchar',
            length: '100',
            isNullable: false,
            comment: 'Nombre del tipo de contacto',
          },
          {
            name: 'orden',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'mostrar',
            type: 'smallint',
            isNullable: true,
            default: '1',
            comment:
              'Indica si se mostrará el tipo de contacto en ciertas interfaces',
          },
          {
            name: 'icon',
            type: 'varchar',
            length: '50',
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
    await queryRunner.dropTable('tipos_contactos', true);
  }
}
