import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Distrito } from 'src/distrito/entities/distrito.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';

@Entity('centros_medicos')
export class CentroMedico {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_centro_medico',
    comment: 'Identificador único del centro médico',
  })
  pkCentroMedico: string;

  @Column('char', {
    name: 'pk_tmp',
    length: 25,
    nullable: false,
    unique: true,
    comment:
      'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
  })
  pkTmp: string;

  @Column('varchar', {
    name: 'centro_medico',
    nullable: false,
    length: 150,
    comment: 'Nombre del centro médico',
  })
  centroMedico: string;

  @Column('int', {
    name: 'fk_tipo_centro_medico',
    nullable: true,
    comment: 'Llave foránea del tipo de centro médico',
  })
  fkTipoCentroMedico?: number;

  @Column('varchar', {
    name: 'direccion',
    nullable: true,
    length: 100,
    comment: 'Dirección del centro médico',
  })
  direccion?: string;

  @Column('varchar', {
    name: 'potencial',
    nullable: true,
    length: 45,
    comment: 'Potencial del centro médico',
  })
  potencial?: string;

  @Column('varchar', {
    name: 'detalle',
    nullable: true,
    length: 100,
    comment: 'Detalle del centro médico',
  })
  detalle?: string;

  @Column('uuid', {
    name: 'fk_departamento',
    nullable: true,
    unique: false,
    comment: 'Llave foránea al departamento',
  })
  fkDepartamento?: number;

  @Column('int', {
    name: 'fk_tmp_departamento',
    nullable: true,
    comment:
      'Contiene de forma temporal la fk antigua del departamento, para ser actualizada por la fk en formato UUID',
  })
  fkTmpDepartamento?: number;

  @Column('uuid', {
    name: 'fk_provincia',
    nullable: true,
    unique: false,
    comment: 'Llave foránea a la provincia',
  })
  fkProvincia?: number;

  @Column('int', {
    name: 'fk_tmp_provincia',
    nullable: true,
    comment:
      'Contiene de forma temporal la fk antigua de la provincia, para ser actualizada por la fk en formato UUID',
  })
  fkTmpProvincia?: number;

  @Column('uuid', {
    name: 'fk_distrito',
    nullable: true,
    unique: false,
    comment: 'Llave foránea al distrito',
  })
  fkDistrito?: number;

  @Column('int', {
    name: 'fk_tmp_distrito',
    nullable: true,
    comment:
      'Contiene de forma temporal la fk antigua del distrito, para ser actualizada por la fk en formato UUID',
  })
  fkTmpDistrito?: number;

  @Column('varchar', {
    name: 'referencia',
    nullable: true,
    length: 100,
    comment: 'Referencia del centro médico',
  })
  referencia?: string;

  @Column('varchar', {
    name: 'telefono',
    nullable: true,
    length: 50,
    comment: 'Teléfono del centro médico',
  })
  telefono?: string;

  @ManyToOne(() => Departamento)
  @JoinColumn({ name: 'fk_departamento' })
  departamento?: Departamento;

  @ManyToOne(() => Provincia)
  @JoinColumn({ name: 'fk_provincia' })
  provincia?: Provincia;

  @ManyToOne(() => Distrito)
  @JoinColumn({ name: 'fk_distrito' })
  distrito?: Distrito;

  @CreateDateColumn({
    name: 'creado_el',
    nullable: false,
    type: 'timestamp',
    default: () => 'now()',
    comment: 'Fecha de creación del centro médico',
    precision: 3,
  })
  creadoEl: Date;

  @UpdateDateColumn({
    name: 'actualizado_el',
    nullable: false,
    type: 'timestamp',
    default: () => 'now()',
    comment: 'Fecha de actualización del centro médico',
    precision: 3,
  })
  actualizadoEl: Date;

  @Column('timestamp', {
    name: 'eliminado_el',
    nullable: true,
    comment: 'Fecha de eliminación lógica del centro médico',
  })
  eliminadoEl?: Date;
}
