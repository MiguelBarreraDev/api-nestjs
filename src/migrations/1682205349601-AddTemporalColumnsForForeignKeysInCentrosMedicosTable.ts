import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTemporalColumnsForForeignKeysInCentrosMedicosTable1682205349601
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumns('centros_medicos', [
      {
        oldColumn: new TableColumn({
          name: 'fk_departamento',
          type: 'int',
        }),
        newColumn: new TableColumn({
          name: 'fk_tmp_departamento',
          type: 'int',
          comment:
            'Contiene de forma temporal la fk antigua del departamento, para ser actualizada por la fk en formato UUID',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'fk_provincia',
          type: 'int',
        }),
        newColumn: new TableColumn({
          name: 'fk_tmp_provincia',
          type: 'int',
          comment:
            'Contiene de forma temporal la fk antigua de la provincia, para ser actualizada por la fk en formato UUID',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'fk_distrito',
          type: 'int',
        }),
        newColumn: new TableColumn({
          name: 'fk_tmp_distrito',
          type: 'int',
          comment:
            'Contiene de forma temporal la fk antigua del distrito, para ser actualizada por la fk en formato UUID',
        }),
      },
    ]);

    await queryRunner.addColumns('centros_medicos', [
      new TableColumn({
        name: 'fk_departamento',
        type: 'uuid',
        isNullable: true,
        isUnique: false,
        comment: 'Llave foránea al departamento',
      }),
      new TableColumn({
        name: 'fk_provincia',
        type: 'uuid',
        isNullable: true,
        isUnique: false,
        comment: 'Llave foránea a la provincia',
      }),
      new TableColumn({
        name: 'fk_distrito',
        type: 'uuid',
        isNullable: true,
        isUnique: false,
        comment: 'Llave foránea al distrito',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('centros_medicos', [
      'fk_departamento',
      'fk_provincia',
      'fk_distrito',
    ]);

    await queryRunner.changeColumns('centros_medicos', [
      {
        oldColumn: new TableColumn({
          name: 'fk_tmp_departamento',
          type: 'int',
        }),
        newColumn: new TableColumn({
          name: 'fk_departamento',
          type: 'int',
          comment: 'Llave foránea al departamento',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'fk_tmp_provincia',
          type: 'int',
        }),
        newColumn: new TableColumn({
          name: 'fk_provincia',
          type: 'int',
          comment: 'Llave foránea a la provincia',
        }),
      },
      {
        oldColumn: new TableColumn({
          name: 'fk_tmp_distrito',
          type: 'int',
        }),
        newColumn: new TableColumn({
          name: 'fk_distrito',
          type: 'int',
          comment: 'Llave foránea al distrito',
        }),
      },
    ]);
  }
}
