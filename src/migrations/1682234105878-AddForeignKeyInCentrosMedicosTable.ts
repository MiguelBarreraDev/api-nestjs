import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeignKeyInCentrosMedicosTable1682234105878
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('centros_medicos', [
      new TableForeignKey({
        columnNames: ['fk_departamento'],
        referencedColumnNames: ['pk_departamento'],
        referencedTableName: 'departamentos',
      }),
      new TableForeignKey({
        columnNames: ['fk_provincia'],
        referencedColumnNames: ['pk_provincia'],
        referencedTableName: 'provincias',
      }),
      new TableForeignKey({
        columnNames: ['fk_distrito'],
        referencedColumnNames: ['pk_distrito'],
        referencedTableName: 'distritos',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('centros_medicos', [
      new TableForeignKey({
        columnNames: ['fk_departamento'],
        referencedColumnNames: ['pk_departamento'],
        referencedTableName: 'departamentos',
      }),
      new TableForeignKey({
        columnNames: ['fk_provincia'],
        referencedColumnNames: ['pk_provincia'],
        referencedTableName: 'provincias',
      }),
      new TableForeignKey({
        columnNames: ['fk_distrito'],
        referencedColumnNames: ['pk_distrito'],
        referencedTableName: 'distritos',
      }),
    ]);
  }
}
