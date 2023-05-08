import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('visitas_medicas')
export class VisitaMedica {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_visita_medica',
    comment: 'Identificador único de la visita médica',
  })
  pkVisitaMedica: string;

  @Column({
    name: 'pk_tmp',
    type: 'int',
    nullable: true,
    unique: true,
    comment:
      'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
  })
  pkTmp?: number;

  @Column('timestamp', { name: 'fecha', nullable: false })
  fecha: Date;

  @Column('varchar', { name: 'comentario', nullable: true, length: 450 })
  comentario?: string;

  @Column('timestamp', { name: 'proxima_fecha', nullable: true })
  proximaFecha?: Date;

  @Column('varchar', { name: 'proximo_paso', nullable: true, length: 450 })
  proximoPaso?: string;

  @Column('int', { name: 'fk_usuario', nullable: false })
  fkUsuario: number;

  @Column('varchar', { name: 'fk_medico', length: 25, nullable: false })
  fkMedico: string;

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
