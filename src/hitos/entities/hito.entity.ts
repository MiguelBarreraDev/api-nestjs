import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hitos')
export class Hito {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_hito',
    comment: 'Identificador único del hito',
  })
  pkHito: string;

  @Column({
    name: 'pk_tmp',
    type: 'int',
    nullable: false,
    unique: true,
    comment:
      'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
  })
  pkTmp: number;

  @Column('varchar', {
    name: 'hito',
    length: 100,
    comment: 'Nombre del hito',
    nullable: false,
  })
  hito: string;

  @Column('int', { name: 'metrica', nullable: true })
  metrica?: number;

  @Column('smallint', { name: 'estado', default: 1 })
  estado: number;

  @Column('varchar', { name: 'grupo', length: 100 })
  grupo: string;

  @Column('varchar', { name: 'icono', length: 50 })
  icono: string;

  @Column('varchar', { name: 'color', nullable: true, length: 7 })
  color?: string;

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
