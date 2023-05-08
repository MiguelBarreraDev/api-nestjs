import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { medicoHitoEntity } from './factories/medico-hitos.factory';
import { MedicoHitosController } from './medico-hitos.controller';
import { MedicoHitosService } from './medico-hitos.service';

import { MedicoHitos } from 'src/medico-hitos/entities/medico-hitos.entity';

describe('MedicoHitosController', () => {
  let controller: MedicoHitosController;
  let service: MedicoHitosService;

  const medicoHitosMock: MedicoHitos[] = [medicoHitoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicoHitosController],
      providers: [
        MedicoHitosService,
        { provide: getRepositoryToken(MedicoHitos), useValue: {} },
      ],
    }).compile();

    controller = module.get<MedicoHitosController>(MedicoHitosController);
    service = module.get<MedicoHitosService>(MedicoHitosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return all medicoHitos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(medicoHitosMock);

      const result = await controller.findAll();
      expect(result).toEqual(medicoHitosMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a medicoHitos', async () => {
      const id = medicoHitosMock[0].pkMedicoHito;

      jest.spyOn(service, 'findOne').mockResolvedValue(medicoHitosMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(medicoHitosMock[0]);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });
});
