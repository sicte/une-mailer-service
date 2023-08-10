import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaestraItems } from './maestra-items.entity';

@Entity('log_items')
export class LogItems {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id_Log' })
  idLog: number;

  @Column('varchar', { name: 'Tipo', length: 64 })
  tipo: string;

  @Column('bigint', { name: 'Id_SPR_20' })
  idSpr_20: string;

  @Column('bigint', { name: 'Id_Enca_Acta_Entrega_6', nullable: true })
  idEncaActaEntrega_6: string | null;

  @Column('varchar', { name: 'Id_Item_9', length: 16 })
  idItem_9: string;

  @Column('float', {
    name: 'Cantidad',
    nullable: true,
    precision: 20,
    scale: 2,
    default: () => "'0.00'",
  })
  cantidad: number | null;

  @Column('tinyint', { name: 'Indicativo_Reserva', default: () => "'2'" })
  indicativoReserva: number;

  @Column('datetime', {
    name: 'Fecha',
    nullable: true,
    comment: 'Datos de Control',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date | null;

  @ManyToOne(() => MaestraItems, (maestraItems) => maestraItems.idItem)
  @JoinColumn([{ name: 'Id_Item_9', referencedColumnName: 'idItem' }])
  maestraItems: MaestraItems;
}
