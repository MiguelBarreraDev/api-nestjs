import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Provincia } from 'src/provincia/entities/provincia.entity';

@Entity('departamentos')
export class Departamento {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_departamento',
    comment: 'Identificador único del departamento',
  })
  pkDepartamento: string;

  @Column({
    name: 'pk_tmp',
    type: 'int',
    nullable: false,
    unique: true,
    comment:
      'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
  })
  pkTmp: number | null;

  @Column('varchar', {
    name: 'departamento',
    nullable: false,
    comment: 'Nombre del departamento',
    length: 45,
  })
  departamento: string;

  @OneToMany(() => Provincia, (provincia) => provincia.departamento)
  provinces: Provincia[];

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
