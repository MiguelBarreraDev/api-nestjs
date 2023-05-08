import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateRelationManyToOneFromProvinciasWithDepartamentos1680995143211
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
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
}
