import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMedicos1680724834346 implements MigrationInterface {
  name = 'CreateTableMedicos1680724834346';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medicos',
        columns: [
          {
            name: 'pk_medico',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'uuid',
            comment: 'Identificador único del medico',
          },
          {
            name: 'pk_tmp',
            type: 'char',
            isNullable: true,
            isUnique: true,
            length: '25',
          },
          {
            name: 'nombres',
            type: 'varchar',
            length: '45',
            isNullable: false,
            comment: 'Nombres del medico',
          },
          {
            name: 'apellidos',
            type: 'varchar',
            length: '45',
            isNullable: false,
            comment: 'Apellidos del medico',
          },
          {
            name: 'tipo_documento',
            type: 'varchar',
            length: '45',
            isNullable: false,
          },
          {
            name: 'documento',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'correo',
            type: 'varchar',
            length: '255',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'telefono',
            type: 'varchar',
            length: '20',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'fk_especialidad',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'fk_tmp_especialidad',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'fk_subespecialidad',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'fk_tmp_subespecialidad',
            type: 'varchar',
            length: '60',
            isNullable: true,
          },
          {
            name: 'fk_centro_medico_1',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'fk_tmp_centro_medico_1',
            type: 'varchar',
            length: '25',
            isNullable: true,
          },
          {
            name: 'fk_centro_medico_2',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'fk_tmp_centro_medico_2',
            type: 'varchar',
            length: '25',
            isNullable: true,
          },
          {
            name: 'fk_usuario_representante',
            type: 'uuid',
            isNullable: true,
            comment: 'Identificador único del usuario representante del medico',
          },
          {
            name: 'fk_tmp_usuario_representante',
            type: 'varchar',
            length: '25',
            isNullable: true,
            comment:
              'Identificador temporal del usuario representante del medico',
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
    await queryRunner.dropTable('medicos', true);
  }
}
