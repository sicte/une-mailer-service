import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EncaActasEntrega } from './enca-actas-entrega.entity';
import { MaestraItems } from './maestra-items.entity';

@Entity('deta_actas_entrega')
export class DetaActasEntrega {
  @Column('bigint', {
    primary: true,
    name: 'Id_Enca_Acta_Entrega_1',
    default: () => "'0'",
  })
  idEncaActaEntrega_1: string;

  @Column('bigint', { primary: true, name: 'Id_SPR_9', default: () => "'0'" })
  idSpr_9: string;

  @Column('varchar', {
    primary: true,
    name: 'Id_Item_3',
    length: 16,
    default: () => "''",
  })
  idItem_3: string;

  @Column('float', {
    name: 'Cantidad_Instalada',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  cantidadInstalada: number | null;

  @Column('float', {
    name: 'Valor_Instalado',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  valorInstalado: number | null;

  @Column('float', {
    name: 'Cantidad_Servible',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  cantidadServible: number | null;

  @Column('float', {
    name: 'Valor_Servible',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  valorServible: number | null;

  @Column('float', {
    name: 'Cantidad_Inservible',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  cantidadInservible: number | null;

  @Column('float', {
    name: 'Valor_Inservible',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  valorInservible: number | null;

  @Column('varchar', { name: 'Serial', length: 256, default: () => "''" })
  serial: string;

  @Column('varchar', { name: 'Observacion', nullable: true, length: 256 })
  observacion: string | null;

  @Column('datetime', {
    name: 'Fecha_item',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaItem: Date;

  @Column('tinyint', {
    name: 'Indicativo_Reserva',
    comment: '1=reservado, 2 = sin reservar',
    default: () => "'2'",
  })
  indicativoReserva: number;

  @ManyToOne(() => EncaActasEntrega, (encaActasEntrega) => encaActasEntrega.detaActasEntregas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    {
      name: 'Id_Enca_Acta_Entrega_1',
      referencedColumnName: 'idEncaActaEntrega',
    },
  ])
  idEncaActaEntrega: EncaActasEntrega;

  @ManyToOne(() => MaestraItems, (maestraItems) => maestraItems.detaActasEntregas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'Id_Item_3', referencedColumnName: 'idItem' }])
  idItem: MaestraItems;
}
