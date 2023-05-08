import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTareasCategorias1677260222810
  implements MigrationInterface
{
  name = 'CreateTableTareasCategorias1677260222810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tareas_categorias',
        columns: [
          {
            name: 'pk_tareas_categoria',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único de la categoría de tareas',
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
            name: 'categoria',
            type: 'varchar',
            length: '255',
            isNullable: false,
            comment: 'Nombre de la categoría de tareas',
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
    await queryRunner.dropTable('tareas_categorias', true);
  }
}
