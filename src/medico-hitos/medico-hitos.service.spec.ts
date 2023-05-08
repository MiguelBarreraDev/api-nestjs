import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { medicoHitoEntity } from './factories/medico-hitos.factory';
import { MedicoHitosService } from './medico-hitos.service';

import { MedicoHitos } from 'src/medico-hitos/entities/medico-hitos.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

describe('MedicoHitosService', () => {
  let service: MedicoHitosService;
  let medicoHitosRepository: Repository<MedicoHitos>;

  const medicoHitosMock: MedicoHitos[] = [medicoHitoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicoHitosService,
        {
          provide: getRepositoryToken(MedicoHitos),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MedicoHitosService>(MedicoHitosService);
    medicoHitosRepository = module.get<Repository<MedicoHitos>>(
      getRepositoryToken(MedicoHitos),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('medicoHitosRepository dependency should be defined', () => {
    expect(medicoHitosRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return all mehicoHitos', async () => {
      jest
        .spyOn(medicoHitosRepository, 'find')
        .mockResolvedValue(medicoHitosMock);

      const result = await service.findAll();
      expect(result).toEqual(medicoHitosMock);
    });
    it('should return an empty array if there are no mehicoHitos', async () => {
      jest.spyOn(medicoHitosRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });
  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('should return one mehicoHitos', async () => {
      const pkMedicoHito = medicoHitosMock[0].pkMedicoHito;

      jest
        .spyOn(medicoHitosRepository, 'findOneBy')
        .mockResolvedValue(medicoHitosMock[0]);

      const result = await service.findOne(pkMedicoHito);
      expect(result).toEqual(medicoHitosMock[0]);
    });
    it('throw EntityNotFoundException when medicoHitos not found', async () => {
      const pkMedicoHito = 'incorerect-id';

      jest.spyOn(medicoHitosRepository, 'findOneBy').mockResolvedValue(null);

      expect(service.findOne(pkMedicoHito)).rejects.toThrow(
        EntityNotFoundException,
      );
      expect(service.findOne(pkMedicoHito)).rejects.toThrow(
        new EntityNotFoundException(MedicoHitos.name, pkMedicoHito).message,
      );
    });
  });
});
