import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tipos_contactos')
export class TipoContacto {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_tipo_contacto',
    comment: 'Identificador único del tipo de contacto',
  })
  pkTipoContacto: string;

  @Column({
    name: 'pk_tmp',
    type: 'int',
    nullable: true,
    unique: true,
    comment:
      'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
  })
  pkTmp?: number;

  @Column('varchar', {
    name: 'tipo_contacto',
    nullable: false,
    length: 100,
    comment: 'Nombre del tipo de contacto',
  })
  tipoContacto: string;

  @Column('int', { name: 'orden', nullable: true })
  orden?: number;

  @Column('smallint', {
    name: 'mostrar',
    nullable: true,
    default: '1',
    comment: 'Indica si se mostrará el tipo de contacto en ciertas interfaces',
  })
  mostrar?: number;

  @Column('varchar', { name: 'icon', nullable: true, length: 50 })
  icon?: string;

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
