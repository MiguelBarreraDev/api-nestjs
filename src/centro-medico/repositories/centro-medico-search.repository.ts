import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { SearchQueryDto } from '../dto/search-query.dto';
import { CentroMedico } from '../entities/centro-medico.entity';

@Injectable()
export class CentroMedicoSearchRepository {
  constructor(
    @InjectRepository(CentroMedico)
    private centroMedicoRepository: Repository<CentroMedico>,
  ) {}

  search(searchQueryDto: SearchQueryDto) {
    const { query, take = 1000, skip = 0 } = searchQueryDto;

    console.log({ query, take, skip });

    return this.centroMedicoRepository
      .createQueryBuilder('centroMedico')
      .leftJoin('centroMedico.provincia', 'provincia')
      .leftJoin('centroMedico.distrito', 'distrito')
      .leftJoin('centroMedico.departamento', 'departamento')
      .select(['centroMedico', 'provincia', 'distrito', 'departamento'])
      .where(
        new Brackets((qb) => {
          qb.where('centroMedico.centroMedico ILIKE :query', {
            query: `%${query}%`,
          })
            .orWhere('centroMedico.direccion ILIKE :query', {
              query: `%${query}%`,
            })
            .orWhere('centroMedico.potencial ILIKE :query', {
              query: `%${query}%`,
            })
            .orWhere('centroMedico.detalle ILIKE :query', {
              query: `%${query}%`,
            })
            .orWhere('provincia.provincia ILIKE :query', {
              query: `%${query}%`,
            })
            .orWhere('distrito.distrito ILIKE :query', {
              query: `%${query}%`,
            })
            .orWhere('departamento.departamento ILIKE :query', {
              query: `%${query}%`,
            })
            .orWhere('centroMedico.telefono ILIKE :query', {
              query: `%${query}%`,
            })
            .orWhere('centroMedico.referencia ILIKE :query', {
              query: `%${query}%`,
            });
        }),
      )
      .take(take)
      .skip(skip)
      .getMany();
  }
}
