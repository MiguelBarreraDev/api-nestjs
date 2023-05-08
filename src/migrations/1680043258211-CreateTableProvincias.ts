import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProvincias1680043258211 implements MigrationInterface {
  name = 'CreateTableProvincias1680043258211';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'provincias',
        columns: [
          {
            name: 'pk_provincia',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único de la provincia',
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
            name: 'fk_departamento',
            type: 'uuid',
            isNullable: true,
            isUnique: false,
            comment:
              'Hace referencia al departamento al que pertenece la provincia',
          },
          {
            name: 'fk_tmp_departamento',
            type: 'int',
            isNullable: true,
            isUnique: false,
            comment:
              'Contiene de forma temporal las fk antiguas de departamento, para ser actualizadas por las fk en formato UUID',
          },
          {
            name: 'provincia',
            type: 'varchar',
            length: '45',
            isNullable: false,
            comment: 'Nombre de la provincia',
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
    await queryRunner.dropTable('provincias', true);
  }
}
