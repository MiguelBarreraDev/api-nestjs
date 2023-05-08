import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { hitosContactoEntity } from './factories/hitos-contacto.factory';
import { HitosContactoService } from './hitos-contacto.service';

import { HitosContacto } from 'src/hitos-contacto/entities/hitos-contacto.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

describe('HitosContactoService', () => {
  let service: HitosContactoService;
  let hitosContactoRepository: Repository<HitosContacto>;

  const hitosContactoMock: HitosContacto[] = [hitosContactoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HitosContactoService,
        {
          provide: getRepositoryToken(HitosContacto),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<HitosContactoService>(HitosContactoService);
    hitosContactoRepository = module.get<Repository<HitosContacto>>(
      getRepositoryToken(HitosContacto),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('hitosContactoRepository dependency should be defined', () => {
    expect(hitosContactoRepository).toBeDefined;
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return all hitosContacto', async () => {
      jest
        .spyOn(hitosContactoRepository, 'find')
        .mockResolvedValue(hitosContactoMock);

      const result = await hitosContactoRepository.find();
      expect(result).toEqual(hitosContactoMock);
    });
    it('sould return an empty array if there are no data exists', async () => {
      jest.spyOn(hitosContactoRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('throw HitoContactoNotFoundException when HitoContacto not found', async () => {
      const pkHitoContacto = 'incorrect_id';

      jest.spyOn(hitosContactoRepository, 'findOneBy').mockResolvedValue(null);

      expect(service.findOne(pkHitoContacto)).rejects.toThrow(
        EntityNotFoundException,
      );

      expect(service.findOne(pkHitoContacto)).rejects.toThrow(
        new EntityNotFoundException(HitosContacto.name, pkHitoContacto).message,
      );
    });
  });
});
