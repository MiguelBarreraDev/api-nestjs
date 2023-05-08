import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tareas_categorias')
export class TareasCategorias {
  @PrimaryGeneratedColumn('uuid', {
    name: 'pk_tareas_categoria',
    comment: 'Identificador único de la categoría de tareas',
  })
  pkTareasCategoria: string;

  @Column({
    name: 'pk_tmp',
    type: 'int',
    nullable: true,
    unique: true,
    comment:
      'Contiene de forma temporal las pk antiguas, para actualizar la fk en las tablas que dependan de esta',
  })
  pkTmp: number;

  @Column('varchar', {
    name: 'categoria',
    nullable: false,
    length: 255,
    comment: 'Nombre de la categoría de tareas',
  })
  categoria: string;

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
