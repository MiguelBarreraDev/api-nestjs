import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { MedicoHitos } from 'src/medico-hitos/entities/medico-hitos.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

@Injectable()
export class MedicoHitosService {
  constructor(
    @InjectRepository(MedicoHitos)
    private medicoHitosRepository: Repository<MedicoHitos>,
  ) {}

  /**
   * Obtener una relación entre médico e hito por el Id de la relación
   * @param id Id del la relación entre médico e hito
   * @returns La relación entre médico e hito obtenida
   */
  private async getMedicoHitos(id: string) {
    const medicoHito = await this.medicoHitosRepository.findOneBy({
      pkMedicoHito: id,
    });

    if (!medicoHito) {
      throw new EntityNotFoundException(MedicoHitos.name, id);
    }

    return medicoHito;
  }

  /**
   * Encontrar todas las relaciones entre médicos e hitos
   * @returns Lista de relaciones entre médicos e hitos
   */
  findAll() {
    return this.medicoHitosRepository.find();
  }

  /**
   * Encontrar una relación entre médico e hito por el id de la relación
   * @param id Id de la relación
   * @returns Relación entre médico e hito
   */
  findOne(id: string) {
    return this.getMedicoHitos(id);
  }

  /**
   * Obtiene la cantidad total de hitos alcanzados por algunos médicos
   * @param medicosId Lista de ids de médicos
   * @returns Núméro de hitos alcanzados
   */
  async countByMedicosId(medicosId: string[]) {
    return this.medicoHitosRepository.countBy({ fkMedico: In(medicosId) });
  }
}
