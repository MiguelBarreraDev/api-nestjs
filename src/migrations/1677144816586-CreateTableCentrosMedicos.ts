import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCentrosMedicos1677144816586
  implements MigrationInterface
{
  name = 'CreateTableCentrosMedicos1677144816586';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'centros_medicos',
        columns: [
          {
            name: 'pk_centro_medico',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
            isNullable: false,
            comment: 'Identificador único del centro médico',
          },
          {
            name: 'pk_tmp',
            type: 'char',
            length: '25',
            isNullable: false,
            isUnique: true,
            comment:
              'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
          },
          {
            name: 'centro_medico',
            type: 'varchar',
            length: '150',
            isNullable: false,
            comment: 'Nombre del centro médico',
          },
          {
            name: 'fk_tipo_centro_medico',
            type: 'int',
            isNullable: true,
            comment: 'Llave foránea del tipo de centro médico',
          },
          {
            name: 'direccion',
            type: 'varchar',
            length: '100',
            isNullable: true,
            comment: 'Dirección del centro médico',
          },
          {
            name: 'potencial',
            type: 'varchar',
            length: '45',
            isNullable: true,
            comment: 'Potencial del centro médico',
          },
          {
            name: 'detalle',
            type: 'varchar',
            length: '100',
            isNullable: true,
            comment: 'Detalle del centro médico',
          },
          {
            name: 'fk_departamento',
            type: 'int',
            isNullable: true,
            comment: 'Llave foránea al departamento',
          },
          {
            name: 'fk_provincia',
            type: 'int',
            isNullable: true,
            comment: 'Llave foránea a la provincia',
          },
          {
            name: 'fk_distrito',
            type: 'int',
            isNullable: true,
            comment: 'Llave foránea al distrito',
          },
          {
            name: 'referencia',
            type: 'varchar',
            length: '100',
            isNullable: true,
            comment: 'Referencia del centro médico',
          },
          {
            name: 'telefono',
            type: 'varchar',
            length: '50',
            isNullable: true,
            comment: 'Teléfono del centro médico',
          },
          {
            name: 'creado_el',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
            comment: 'Fecha de creación del centro médico',
            precision: 3,
          },
          {
            name: 'actualizado_el',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
            comment: 'Fecha de actualización del centro médico',
            precision: 3,
          },
          {
            name: 'eliminado_el',
            type: 'timestamp',
            isNullable: true,
            comment: 'Fecha de eliminación lógica del centro médico',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('centros_medicos', true);
  }
}
