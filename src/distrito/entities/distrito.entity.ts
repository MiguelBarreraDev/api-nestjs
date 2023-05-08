import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Provincia } from 'src/provincia/entities/provincia.entity';

@Entity('distritos')
export class Distrito {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_distrito',
    comment: 'Identificador único del distrito',
  })
  pkDistrito: string;

  @Column({
    type: 'int',
    name: 'pk_tmp',
    nullable: true,
    unique: true,
    comment:
      'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
  })
  pkTmp: number;

  @Column('varchar', {
    name: 'distrito',
    comment: 'Nombre del distrito',
    length: 45,
  })
  distrito: string;

  @Column('uuid', {
    name: 'fk_provincia',
    nullable: true,
    unique: false,
    comment: 'Hace referencia a la provincia donde se encontrará el distrito',
  })
  fkProvincia: number | null;

  @Column({
    type: 'int',
    name: 'fk_tmp_provincia',
    nullable: true,
    unique: false,
    comment:
      'Contiene de forma temporal las fk antiguas de provincia, para ser actualizadas por las fk en formato UUID',
  })
  fkTmpProvincia: number | null;

  @Column('smallint', {
    name: 'auto_service',
    nullable: true,
    default: 0,
  })
  autoService: number | null;

  @Column('char', { name: 'ubigeo', nullable: true, length: 8 })
  ubigeo: string | null;

  @ManyToOne(() => Provincia, (provincia) => provincia.districts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_provincia' })
  province: Provincia;

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
