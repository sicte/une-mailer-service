import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetaActasEntrega } from './deta-actas-entrega.entity';
import { DetaReservas } from './deta-reservas.entity';

@Entity('enca_actas_entrega')
export class EncaActasEntrega {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id_Enca_Acta_Entrega' })
  idEncaActaEntrega: string;

  @Column('bigint', { name: 'Id_SPR_6', nullable: true })
  idSpr_6: string | null;

  @Column('datetime', {
    name: 'Fecha',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date | null;

  @Column('int', { name: 'HP' })
  hp: number;

  @Column('tinyint', {
    name: 'Tipo_Acta',
    comment: '1 para total, 2 para parcial',
  })
  tipoActa: number;

  @Column('tinyint', {
    name: 'Categoria_Acta',
    comment: ' 1 Visita, 2 Diseño, 3 Construcción',
  })
  categoriaActa: number;

  @Column('varchar', {
    name: 'Repositorio_Acta_Entrega',
    nullable: true,
    length: 512,
  })
  repositorioActaEntrega: string | null;

  @Column('varchar', {
    name: 'Id_Usuario_4',
    nullable: true,
    comment: 'Interventoría',
    length: 16,
  })
  idUsuario_4: string | null;

  @Column('varchar', {
    name: 'Id_Usuario_8',
    nullable: true,
    comment: 'Contratista',
    length: 16,
  })
  idUsuario_8: string | null;

  @Column('varchar', {
    name: 'Id_Usuario_50',
    comment: 'Usuario Firma Contratista',
    length: 16,
    default: () => "''",
  })
  idUsuario_50: string;

  @Column('varchar', {
    name: 'Observacion_Contratista',
    nullable: true,
    length: 2048,
  })
  observacionContratista: string | null;

  @Column('varchar', {
    name: 'Observacion_Interventor',
    nullable: true,
    length: 2048,
  })
  observacionInterventor: string | null;

  @Column('tinyint', {
    name: 'Aprobada',
    comment: '0 Pendiente, 1 Aprobado, 2 No aprobado, 3 Anulada',
    default: () => "'0'",
  })
  aprobada: number;

  @Column('tinyint', {
    name: 'Guardar_final',
    nullable: true,
    comment: '1 Si, 2 No',
    default: () => "'1'",
  })
  guardarFinal: number | null;

  @Column('date', { name: 'Intencion_Pago', nullable: true })
  intencionPago: string | null;

  @Column('datetime', { name: 'Pago', nullable: true })
  pago: Date | null;

  @Column('varchar', {
    name: 'Id_Vigencia_1',
    length: 4,
    default: () => "'2022'",
  })
  idVigencia_1: string;

  @Column('tinyint', {
    name: 'Especial_Vigencia',
    comment: '1 Activa, 2 Inactiva',
    default: () => "'2'",
  })
  especialVigencia: number;

  @Column('int', { name: 'Numero_Acta', nullable: true })
  numeroActa: number | null;

  @Column('tinyint', {
    name: 'Indicativo_Reserva',
    comment: '2 sin reservar, 1 reservado',
  })
  indicativoReserva: number;

  @Column('varchar', {
    name: 'Id_Usuario_43',
    nullable: true,
    comment: 'Datos de Control',
    length: 16,
  })
  idUsuario_43: string | null;

  @Column('datetime', {
    name: 'Fecha_Control',
    nullable: true,
    comment: 'Datos de Control',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaControl: Date | null;

  @OneToMany(() => DetaActasEntrega, (detaActasEntrega) => detaActasEntrega.idEncaActaEntrega)
  detaActasEntregas: DetaActasEntrega[];

  @OneToMany(() => DetaReservas, (detaReservas) => detaReservas.idEncaActaEntrega)
  detaReservas: DetaReservas[];
}
