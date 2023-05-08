import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableVisitasMedicas1677292782366
  implements MigrationInterface
{
  name = 'CreateTableVisitasMedicas1677292782366';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'visitas_medicas',
        columns: [
          {
            name: 'pk_visita_medica',
            type: 'uuid',
            isPrimary: true,
            isNullable: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único de la visita médica',
          },
          {
            name: 'pk_tmp',
            type: 'int',
            isNullable: true,
            isUnique: true,
            comment:
              'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
          },
          {
            name: 'fecha',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'comentario',
            type: 'varchar',
            isNullable: true,
            length: '450',
          },
          {
            name: 'proxima_fecha',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'proximo_paso',
            type: 'varchar',
            isNullable: true,
            length: '450',
          },
          {
            name: 'fk_usuario',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'fk_medico',
            type: 'varchar',
            isNullable: false,
            length: '25',
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
    await queryRunner.dropTable('visitas_medicas', true);
  }
}
