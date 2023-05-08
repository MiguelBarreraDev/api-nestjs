import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Provincia } from './entities/provincia.entity';

import { EntityNotFoundException } from 'src/shared/exceptions';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private provinciaRepository: Repository<Provincia>,
  ) {}

  /**
   * Find all provinces
   * @returns Array of provinces or empty array
   */
  findAll() {
    return this.provinciaRepository.find();
  }

  /**
   * Find one province by id
   * @param id  Id of the province
   * @returns  Province or throws an exception if not found
   */
  async findOne(id: string) {
    const provincia = await this.provinciaRepository.findOneBy({
      pkProvincia: id,
    });

    if (!provincia) {
      throw new EntityNotFoundException(Provincia.name, id);
    }

    return provincia;
  }

  /**
   * Find districts of a province
   * @param id Id of the province
   * @returns Districts of the province
   */
  districts(provinceId: string) {
    return this.provinciaRepository.findOne({
      where: { pkProvincia: provinceId },
      relations: ['districts'],
    });
  }
}
