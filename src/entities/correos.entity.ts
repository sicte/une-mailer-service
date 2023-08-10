import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuarios } from './usuarios.entity';
import { TiposCorreos } from './tipos-correo.entity';

@Entity('correos')
export class Correos {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id_Correo' })
  idCorreo: number;

  @Column('varchar', { name: 'Id_Usuario_62', length: 16 })
  idUsuario_62: string;

  @Column('int', { name: 'Id_Tipo_Correo' })
  idTipoCorreo: number;

  @Column('varchar', {
    name: 'Id_Usuario_46',
    nullable: true,
    comment: 'Datos de Control',
    length: 16,
  })
  idUsuario_46: string | null;

  @Column('datetime', {
    name: 'Fecha',
    nullable: true,
    comment: 'Datos de Control',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha: Date | null;

  @ManyToOne(() => Usuarios, (usuarios) => usuarios.correos, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'Id_Usuario_62', referencedColumnName: 'idUsuario' }])
  idUsuario: Usuarios;

  @ManyToOne(() => TiposCorreos, (tiposCorreos) => tiposCorreos.correos, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'Id_Tipo_Correo', referencedColumnName: 'idTipoCorreo' }])
  idTipoCorreo2: TiposCorreos;
}
