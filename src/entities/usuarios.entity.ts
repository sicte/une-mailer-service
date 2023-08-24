import { Column, Entity, OneToMany } from 'typeorm';
import { Correos } from './correos.entity';

@Entity('usuarios', { schema: 'sicteapp_pruebaune' })
export class Usuarios {
  @Column('varchar', {
    primary: true,
    name: 'Id_Usuario',
    length: 16,
    default: () => "''",
  })
  idUsuario: string;

  @Column('varchar', { name: 'Primer_Apellido', length: 64 })
  primerApellido: string;

  @Column('varchar', {
    name: 'Segundo_Apellido',
    nullable: true,
    length: 64,
    default: () => "''",
  })
  segundoApellido: string | null;

  @Column('varchar', { name: 'Primer_Nombre', length: 64 })
  primerNombre: string;

  @Column('varchar', {
    name: 'Segundo_Nombre',
    nullable: true,
    length: 64,
    default: () => "''",
  })
  segundoNombre: string | null;

  @Column('int', { name: 'Id_Tipo_Usuario_1', nullable: true })
  idTipoUsuario_1: number | null;

  @Column('varchar', { name: 'correo_electronico_1', length: 64 })
  correoElectronico_1: string;

  @Column('varchar', {
    name: 'correo_electronico_2',
    nullable: true,
    length: 64,
    default: () => "''",
  })
  correoElectronico_2: string | null;

  @Column('varchar', { name: 'telefono_1', length: 16 })
  telefono_1: string;

  @Column('varchar', {
    name: 'telefono_2',
    nullable: true,
    length: 16,
    default: () => "''",
  })
  telefono_2: string | null;

  @Column('varchar', {
    name: 'clave',
    nullable: true,
    length: 1024,
    default: () => "''",
  })
  clave: string | null;

  @Column('tinyint', {
    name: 'Estado_Usuario',
    comment: '1 para activo, 0 para inactivo',
  })
  estadoUsuario: number;

  @Column('int', { name: 'Id_Perfil_1' })
  idPerfil_1: number;

  @Column('tinyint', {
    name: 'Compania',
    nullable: true,
    comment: '1 para UNE, 0 para enatel',
  })
  compania: number | null;

  @Column('datetime', {
    name: 'Fecha_Clave',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaClave: Date;

  @Column('int', { name: 'Dias_Cambio_Clave', default: () => "'90'" })
  diasCambioClave: number;

  @Column('tinyint', {
    name: 'Indicativo_clave',
    nullable: true,
    comment: '1 cambio clave, 0 no',
    default: () => "'1'",
  })
  indicativoClave: number | null;

  @Column('tinyint', {
    name: 'Estado_Sesion',
    comment: '1 TRUE, 0 FALSE ',
    default: () => "'1'",
  })
  estadoSesion: number;

  @Column('tinyint', {
    name: 'Permiso_Vigencia',
    comment: '1 Activa, 0 Inactiva',
    default: () => "'0'",
  })
  permisoVigencia: number;

  @Column('varchar', {
    name: 'Id_Usuario_33',
    nullable: true,
    comment: 'Datos de Control',
    length: 16,
  })
  idUsuario_33: string | null;

  @Column('datetime', {
    name: 'Fecha',
    nullable: true,
    comment: 'Datos de Control',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date | null;

  @OneToMany(() => Correos, (correos) => correos.idUsuario)
  correos: Correos[];
}
