import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableHitosContactos1677151952727
  implements MigrationInterface
{
  name = 'CreateTableHitosContactos1677151952727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'hitos_contactos',
        columns: [
          {
            name: 'pk_hito_contacto',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único de la relación hito-contacto',
          },
          {
            name: 'fk_hito',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fk_tipo_contacto',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fk_user',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fk_medico',
            type: 'int',
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
    await queryRunner.dropTable('hitos_contactos', true);
  }
}
