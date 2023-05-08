import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('medicos_hitos')
export class MedicoHitos {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_medico_hito',
    comment: 'Identificador único de la relación méidco-hito',
  })
  pkMedicoHito: string;

  @Column('varchar', {
    name: 'fk_medico',
    length: 50,
    nullable: false,
    comment: 'Llave foránea del médico',
  })
  fkMedico: string;

  @Column('int', {
    name: 'fk_hito',
    nullable: false,
    comment: 'Llave foránea del hito',
  })
  fkHito: number;

  @Column('timestamp', { name: 'fecha', nullable: false })
  fecha: Date;

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
  eliminadoEl: Date | null;
}
