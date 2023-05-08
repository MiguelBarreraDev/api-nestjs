import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateRelationManyToOneFromDistritosToProvincias1681014267367
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'distritos',
      new TableForeignKey({
        columnNames: ['fk_tmp_provincia'],
        referencedColumnNames: ['pk_tmp'],
        referencedTableName: 'provincias',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'distritos',
      new TableForeignKey({
        columnNames: ['fk_tmp_provincia'],
        referencedColumnNames: ['pk_tmp'],
        referencedTableName: 'provincias',
      }),
    );
  }
}
