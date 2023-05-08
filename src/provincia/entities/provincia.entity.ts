import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Distrito } from 'src/distrito/entities/distrito.entity';

@Entity('provincias')
export class Provincia {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_provincia',
    comment: 'Identificador único de la provincia',
  })
  pkProvincia: string;

  @Column({
    type: 'int',
    name: 'pk_tmp',
    nullable: false,
    unique: true,
    comment:
      'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
  })
  pkTmp: number;

  @Column('varchar', {
    name: 'provincia',
    nullable: false,
    comment: 'Nombre de la provincia',
    length: 45,
  })
  provincia: string;

  @Column('uuid', {
    name: 'fk_departamento',
    nullable: true,
    unique: false,
    comment: 'Hace referencia al departamento al que pertenece la provincia',
  })
  fkDepartamento: string | null;

  @Column('int', {
    name: 'fk_tmp_departamento',
    nullable: true,
    unique: false,
    comment:
      'Contiene de forma temporal las fk antiguas de departamento, para ser actualizadas por las fk en formato UUID',
  })
  fkTmpDepartamento: number | null;

  @ManyToOne(() => Departamento, (departamento) => departamento.provinces, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_departamento',
  })
  departamento: Departamento;

  @OneToMany(() => Distrito, (distrito) => distrito.province)
  districts: Distrito[];

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
