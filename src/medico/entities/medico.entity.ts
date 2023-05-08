import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medicos')
export class Medico {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_medico',
    comment: 'Identificador único del medico',
  })
  pkMedico: string;

  @Column({
    name: 'pk_tmp',
    type: 'char',
    nullable: true,
    unique: true,
    length: 25,
  })
  pkTmp: string;

  @Column('varchar', {
    name: 'nombres',
    nullable: false,
    comment: 'Nombres del medico',
    length: 45,
  })
  firstname: string;

  @Column('varchar', {
    name: 'apellidos',
    nullable: false,
    comment: 'Apellidos del medico',
    length: 45,
  })
  lastname: string;

  @Column('varchar', {
    name: 'tipo_documento',
    nullable: false,
    length: 45,
  })
  documentType: string;

  @Column('varchar', {
    name: 'documento',
    nullable: false,
    length: 20,
  })
  document: string;

  @Column('varchar', {
    name: 'correo',
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string;

  @Column('varchar', {
    name: 'telefono',
    nullable: true,
    unique: true,
    length: 20,
  })
  phone: string;

  @Column('uuid', {
    name: 'fk_especialidad',
    nullable: true,
  })
  fkSpecialty: string;

  @Column('int', {
    name: 'fk_tmp_especialidad',
    nullable: true,
  })
  fkTmpSpecialty: number;

  @Column('uuid', {
    name: 'fk_subespecialidad',
    nullable: true,
  })
  fkSubspecialty: string;

  @Column('varchar', {
    name: 'fk_tmp_subespecialidad',
    nullable: true,
    length: 60,
  })
  fkTmpSubspecialty: string;

  @Column('uuid', {
    name: 'fk_centro_medico_1',
    nullable: true,
  })
  fkMedicalCenter1: string;

  @Column('varchar', {
    name: 'fk_tmp_centro_medico_1',
    nullable: true,
    length: 25,
  })
  fkTmpMedicalCenter1: string;

  @Column('uuid', {
    name: 'fk_centro_medico_2',
    nullable: true,
  })
  fkMedicalCenter2: string;

  @Column('varchar', {
    name: 'fk_tmp_centro_medico_2',
    nullable: true,
    length: 25,
  })
  fkTmpMedicalCenter2: string;

  @Column('uuid', {
    name: 'fk_usuario_representante',
    nullable: true,
    comment: 'Identificador único del usuario representante del medico',
  })
  fkRepresentativeUser: string;

  @Column('varchar', {
    name: 'fk_tmp_usuario_representante',
    nullable: true,
    length: 25,
    comment: 'Identificador temporal del usuario representante del medico',
  })
  fkTmpRepresentativeUser: string;

  @CreateDateColumn({
    name: 'creado_el',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
    precision: 3,
  })
  creadoEl: Date;

  @UpdateDateColumn({
    name: 'actualizado_el',
    type: 'timestamp',
    nullable: false,
    default: () => 'now()',
    precision: 3,
  })
  actualizadoEl: Date;

  @Column('timestamp', {
    name: 'eliminado_el',
    nullable: true,
  })
  eliminadoEl?: Date;
}
