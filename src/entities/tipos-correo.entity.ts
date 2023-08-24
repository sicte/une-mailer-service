import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Correos } from './correos.entity';

@Entity('tipos_correos')
export class TiposCorreos {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id_Tipo_Correo' })
  idTipoCorreo: number;

  @Column('varchar', { name: 'Tipo_Correo', length: 128 })
  tipoCorreo: string;

  @OneToMany(() => Correos, (correos) => correos.idTipoCorreo2)
  correos: Correos[];
}
