import { Column, Entity, OneToMany } from 'typeorm';
import { DetaActasEntrega } from './deta-actas-entrega.entity';
import { LogItems } from './log-items.entity';

@Entity('maestra_items')
export class MaestraItems {
  @Column('varchar', {
    primary: true,
    name: 'Id_Item',
    length: 16,
    default: () => "''",
  })
  idItem: string;

  @Column('varchar', { name: 'Item', length: 768 })
  item: string;

  @Column('tinyint', {
    name: 'Tipo_Item',
    comment: '1 para material, 2 para mano de obra',
  })
  tipoItem: number;

  @Column('int', { name: 'Id_Unidad_1', nullable: true })
  idUnidad_1: number | null;

  @Column('tinyint', {
    name: 'Estado_Item',
    comment: '1 para activo, 0 para inactivo',
  })
  estadoItem: number;

  @Column('tinyint', {
    name: 'Discriminado',
    nullable: true,
    comment: '1 para FO, 2 para Coaxial, 3 para Cobre, 4 Obra Civil',
  })
  discriminado: number | null;

  @Column('varchar', { name: 'Grupo_Item', nullable: true, length: 96 })
  grupoItem: string | null;

  @Column('varchar', { name: 'Categoria_IVA', nullable: true, length: 20 })
  categoriaIva: string | null;

  @Column('float', {
    name: 'Iva',
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  iva: number;

  @Column('varchar', {
    name: 'contrib_esp',
    length: 11,
    default: () => "'No Aplica'",
  })
  contribEsp: string;

  @Column('float', {
    name: 'Valor_Contribucion',
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  valorContribucion: number;

  @Column('tinyint', {
    name: 'Serial_s_n',
    comment: '1 Serialzado, 2 No serializado',
    default: () => "'0'",
  })
  serialSN: number;

  @Column('tinyint', {
    name: 'indicativo_bloqueado',
    comment: '0 = Normal 1 = Bloqueado',
    width: 1,
    default: () => "'0'",
  })
  indicativoBloqueado: boolean;

  @Column('tinyint', {
    name: 'Activo_Recogido',
    nullable: true,
    comment: '1 Activo, 2 Recogido',
    default: () => "'1'",
  })
  activoRecogido: number | null;

  @Column('varchar', {
    name: 'Id_Usuario_21',
    nullable: true,
    comment: 'Datos de Control',
    length: 16,
  })
  idUsuario_21: string | null;

  @Column('datetime', {
    name: 'Fecha',
    nullable: true,
    comment: 'Datos de Control',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date | null;

  @OneToMany(() => DetaActasEntrega, (detaActasEntrega) => detaActasEntrega.idItem)
  detaActasEntregas: DetaActasEntrega[];

  @OneToMany(() => LogItems, (logItems) => logItems.maestraItems)
  logItems: LogItems;
}
