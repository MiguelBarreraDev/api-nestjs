import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateForeignKeyInTareasTable1682279128922
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'tareas',
      'fk_categoria',
      new TableColumn({
        name: 'fk_tmp_categoria',
        type: 'int',
        comment:
          'Contiene de forma temporal la fk antigua de la categoria, para ser actualizada por la fk en formato UUID',
      }),
    );

    await queryRunner.addColumn(
      'tareas',
      new TableColumn({
        name: 'fk_categoria',
        type: 'uuid',
        isNullable: true,
        isUnique: false,
        comment: 'Llave foránea a la categoría que pertenece la tarea',
      }),
    );

    await queryRunner.createForeignKey(
      'tareas',
      new TableForeignKey({
        columnNames: ['fk_categoria'],
        referencedColumnNames: ['pk_tareas_categoria'],
        referencedTableName: 'tareas_categorias',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'tareas',
      new TableForeignKey({
        columnNames: ['fk_categoria'],
        referencedColumnNames: ['pk_tareas_categoria'],
        referencedTableName: 'tareas_categorias',
      }),
    );

    await queryRunner.dropColumn('tareas', 'fk_categoria');

    await queryRunner.changeColumn(
      'tareas',
      'fk_tmp_categoria',
      new TableColumn({
        name: 'fk_categoria',
        type: 'int',
        comment: 'Llave foránea a la categoría que pertenece la tarea',
      }),
    );
  }
}
