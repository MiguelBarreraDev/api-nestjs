import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('hitos_contactos')
export class HitosContacto {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_hito_contacto',
    comment: 'Identificador único de la relación hito-contacto',
  })
  pkHitoContacto: string;

  @Column('int', { name: 'fk_hito', nullable: true })
  fkHito?: number;

  @Column('int', { name: 'fk_tipo_contacto', nullable: true })
  fkTipoContacto?: number;

  @Column('int', { name: 'fk_user', nullable: true })
  fkUser?: number;

  @Column('int', { name: 'fk_medico', nullable: true })
  fkMedico?: number;

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
