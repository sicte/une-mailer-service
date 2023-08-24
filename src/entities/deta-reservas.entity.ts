import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EncaActasEntrega } from './enca-actas-entrega.entity';

@Entity('deta_reservas')
export class DetaReservas {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id_Deta_Reserva' })
  idDetaReserva: string;

  @Column('bigint', { name: 'Id_Enca_Acta_Entrega_5' })
  idEncaActaEntrega_5: string;

  @Column('bigint', { name: 'Id_SPR_19' })
  idSpr_19: string;

  @Column('varchar', { name: 'Id_Item_8', length: 16 })
  idItem_8: string;

  @Column('int', { name: 'Id_Lote_1' })
  idLote_1: number;

  @Column('int', { name: 'Id_Almacen_1' })
  idAlmacen_1: number;

  @Column('int', { name: 'Id_Contratista_5' })
  idContratista_5: number;

  @Column('tinyint', {
    name: 'Estado_Reserva',
    nullable: true,
    comment: '1 para activo, 0 para inactivo',
    default: () => "'1'",
  })
  estadoReserva: number | null;

  @Column('varchar', {
    name: 'Id_Usuario_66',
    comment: 'Datos de Control',
    length: 16,
  })
  idUsuario_66: string;

  @Column('datetime', {
    name: 'Fecha_Control',
    comment: 'Datos de Control',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaControl: Date;

  @ManyToOne(() => EncaActasEntrega, (encaActasEntrega) => encaActasEntrega.detaReservas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([
    {
      name: 'Id_Enca_Acta_Entrega_5',
      referencedColumnName: 'idEncaActaEntrega',
    },
  ])
  idEncaActaEntrega: EncaActasEntrega;
}
