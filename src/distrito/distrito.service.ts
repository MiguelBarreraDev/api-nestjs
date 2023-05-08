import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Distrito } from './entities/distrito.entity';

import { EntityNotFoundException } from 'src/shared/exceptions';

@Injectable()
export class DistritoService {
  constructor(
    @InjectRepository(Distrito)
    private distritoRepository: Repository<Distrito>,
  ) {}

  /**
   * Find all districts
   * @returns Array of districts or empty array
   */
  findAll() {
    return this.distritoRepository.find();
  }

  /**
   * Find one district by id
   * @param id Id of the district
   * @returns District or throws an exception if not found
   */
  findOne(id: string) {
    const distrito = this.distritoRepository.findOneBy({ pkDistrito: id });

    if (!distrito) {
      throw new EntityNotFoundException(Distrito.name, id);
    }

    return distrito;
  }
}
