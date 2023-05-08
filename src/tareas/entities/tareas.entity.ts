import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TareasCategorias } from 'src/tareas-categorias/entities/tareas-categorias.entity';

@Entity('tareas')
export class Tareas {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_tarea',
    comment: 'Identificador único de la tarea',
  })
  pkTarea: string;

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
    name: 'tarea',
    nullable: false,
    length: 300,
    comment: 'Nombre de la tarea',
  })
  tarea: string;

  @Column('uuid', {
    name: 'fk_categoria',
    nullable: true,
    unique: false,
    comment: 'Llave foránea a la categoría que pertenece la tarea',
  })
  fkCategoria: number;

  @Column('int', {
    name: 'fk_tmp_categoria',
    nullable: false,
    comment:
      'Contiene de forma temporal la fk antigua de la categoria, para ser actualizada por la fk en formato UUID',
  })
  fkTmpCategoria: number;

  @Column('int', {
    name: 'fk_usuario_asignador',
    nullable: false,
    comment: 'Llave foránea del usuario que asignó la tarea',
  })
  fkUsuarioAsignador: number;

  @Column('int', {
    name: 'fk_usuario_ejecutor',
    nullable: false,
    comment: 'Llave foránea del usuario ejecutor de la tarea',
  })
  fkUsuarioEjecutor: number;

  @Column('smallint', { name: 'estatus', nullable: true, default: '0' })
  estatus?: number;

  @Column('varchar', { name: 'comentario', nullable: true, length: 255 })
  comentario?: string;

  @Column('timestamp', { name: 'fecha_programada', nullable: true })
  fechaProgramada?: Date;

  @ManyToOne(() => TareasCategorias)
  @JoinColumn({ name: 'fk_categoria' })
  categoria: TareasCategorias;

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
