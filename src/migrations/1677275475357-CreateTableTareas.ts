import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableTareas1677275475357 implements MigrationInterface {
  name = 'CreateTableTareas1677275475357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tareas',
        columns: [
          {
            name: 'pk_tarea',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único de la tarea',
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
            name: 'tarea',
            type: 'varchar',
            length: '300',
            isNullable: false,
            comment: 'Nombre de la tarea',
          },
          {
            name: 'fk_categoria',
            type: 'int',
            isNullable: false,
            comment: 'Llave foránea a la categoría que pertenece la tarea',
          },
          {
            name: 'fk_usuario_asignador',
            type: 'int',
            isNullable: false,
            comment: 'Llave foránea del usuario que asignó la tarea',
          },
          {
            name: 'fk_usuario_ejecutor',
            type: 'int',
            isNullable: false,
            comment: 'Llave foránea del usuario ejecutor de la tarea',
          },
          {
            name: 'estatus',
            type: 'smallint',
            isNullable: true,
            default: '0',
          },
          {
            name: 'comentario',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'fecha_programada',
            type: 'timestamp',
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
    await queryRunner.dropTable('tareas', true);
  }
}
