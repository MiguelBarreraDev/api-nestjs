import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateVisitaMedicaDto } from './dto/create-visita-medica.dto';
import { UpdateVisitaMedicaDto } from './dto/update-visita-medica.dto';
import { VisitaMedicaController } from './visita-medica.controller';
import { VisitaMedicaService } from './visita-medica.service';

import { visitaMedicaEntity } from 'src/shared/factories/visita-medica.factory';
import { VisitaMedica } from 'src/visita-medica/entities/visita-medica.entity';

describe('VisitaMedicaController', () => {
  let controller: VisitaMedicaController;
  let service: VisitaMedicaService;

  const visitaMedicaMock: VisitaMedica[] = [visitaMedicaEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitaMedicaController],
      providers: [
        VisitaMedicaService,
        { provide: getRepositoryToken(VisitaMedica), useValue: {} },
      ],
    }).compile();

    controller = module.get<VisitaMedicaController>(VisitaMedicaController);
    service = module.get<VisitaMedicaService>(VisitaMedicaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
    it('should create a visita medica', async () => {
      const createVisitaMedicaDto: CreateVisitaMedicaDto = {
        fkUsuario: 145,
        fecha: '2021-12-14T16:50:55.000Z',
        fkMedico: '01572a63f9c98e55.93094572',
      };

      jest.spyOn(service, 'create').mockResolvedValue(visitaMedicaMock[0]);

      const result = await controller.create(createVisitaMedicaDto);
      expect(result).toEqual(visitaMedicaMock[0]);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return an empty arrat if there are no visitas médicas', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
    it('should return all visita medica', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(visitaMedicaMock);
      const result = await controller.findAll();
      expect(result).toEqual(visitaMedicaMock);
    });
  });
  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a visita médica', async () => {
      const id = visitaMedicaMock[0].pkVisitaMedica;

      jest.spyOn(service, 'findOne').mockResolvedValue(visitaMedicaMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(visitaMedicaMock[0]);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should update a visita medica', async () => {
      const id = visitaMedicaMock[0].pkVisitaMedica;
      const updateVisitaMedicaDto: UpdateVisitaMedicaDto = {};

      jest.spyOn(service, 'update').mockResolvedValue(visitaMedicaMock[0]);

      const result = await controller.update(id, updateVisitaMedicaDto);
      expect(result).toEqual(visitaMedicaMock[0]);
      expect(service.update).toHaveBeenCalledWith(id, updateVisitaMedicaDto);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });
    it('should remove a visita medica', async () => {
      const id = visitaMedicaMock[0].pkVisitaMedica;

      jest.spyOn(service, 'remove').mockResolvedValue(visitaMedicaMock[0]);

      const result = await controller.remove(id);
      expect(result).toEqual(visitaMedicaMock[0]);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
