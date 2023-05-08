import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class DeleteCustomForeignKeyInDistritosAndProvinciasTables1682235318420
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'distritos',
      new TableForeignKey({
        columnNames: ['fk_tmp_provincia'],
        referencedColumnNames: ['pk_tmp'],
        referencedTableName: 'provincias',
      }),
    );
    await queryRunner.dropForeignKey(
      'provincias',
      new TableForeignKey({
        columnNames: ['fk_tmp_departamento'],
        referencedColumnNames: ['pk_tmp'],
        referencedTableName: 'departamentos',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'provincias',
      new TableForeignKey({
        columnNames: ['fk_tmp_departamento'],
        referencedColumnNames: ['pk_tmp'],
        referencedTableName: 'departamentos',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'distritos',
      new TableForeignKey({
        columnNames: ['fk_tmp_provincia'],
        referencedColumnNames: ['pk_tmp'],
        referencedTableName: 'provincias',
      }),
    );
  }
}
