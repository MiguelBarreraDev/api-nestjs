import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateForeignKeysInDistritosAndProvinciasTables1682235908617
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'distritos',
      new TableForeignKey({
        columnNames: ['fk_provincia'],
        referencedColumnNames: ['pk_provincia'],
        referencedTableName: 'provincias',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'provincias',
      new TableForeignKey({
        columnNames: ['fk_departamento'],
        referencedColumnNames: ['pk_departamento'],
        referencedTableName: 'departamentos',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'distritos',
      new TableForeignKey({
        columnNames: ['fk_provincia'],
        referencedColumnNames: ['pk_provincia'],
        referencedTableName: 'provincias',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.dropForeignKey(
      'provincias',
      new TableForeignKey({
        columnNames: ['fk_departamento'],
        referencedColumnNames: ['pk_departamento'],
        referencedTableName: 'departamentos',
        onDelete: 'CASCADE',
      }),
    );
  }
}
