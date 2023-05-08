import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CentroMedicoController } from './centro-medico.controller';
import { CentroMedicoService } from './centro-medico.service';
import { CentroMedicoSearchRepository } from './repositories/centro-medico-search.repository';

import { CentroMedico } from 'src/centro-medico/entities/centro-medico.entity';
import { centroMedicoEntity } from 'src/shared/factories/centro-medico.factory';

describe('CentroMedicoController', () => {
  let controller: CentroMedicoController;
  let service: CentroMedicoService;

  const centroMedicoMock: CentroMedico[] = [centroMedicoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentroMedicoController],
      providers: [
        CentroMedicoService,
        CentroMedicoSearchRepository,
        { provide: getRepositoryToken(CentroMedico), useValue: {} },
      ],
    }).compile();

    controller = module.get<CentroMedicoController>(CentroMedicoController);
    service = module.get<CentroMedicoService>(CentroMedicoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service dependency should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return an empty array if there are no centros médicos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
    it('should return all centros médicos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(centroMedicoMock);

      const result = await controller.findAll();

      expect(result).toEqual(centroMedicoMock);
    });
  });
  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a centro médico', async () => {
      const id = centroMedicoMock[0].pkCentroMedico;

      jest.spyOn(service, 'findOne').mockResolvedValue(centroMedicoMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(centroMedicoMock[0]);
    });
  });
  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
    it('should create a centro médico', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(centroMedicoMock[0]);

      const result = await controller.create(centroMedicoMock[0]);
      expect(result).toEqual(centroMedicoMock[0]);
    });
  });
  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should update a centro médico', async () => {
      const id = centroMedicoMock[0].pkCentroMedico;

      jest.spyOn(service, 'update').mockResolvedValue(centroMedicoMock[0]);

      const result = await controller.update(id, centroMedicoMock[0]);
      expect(result).toEqual(centroMedicoMock[0]);
    });
  });
});
