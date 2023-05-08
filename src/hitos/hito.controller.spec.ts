import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateHitoDto } from './dto/create-hito.dto';
import { UpdateHitoDto } from './dto/update-hito.dto';
import { hitoEntity } from './factories/hito.factory';
import { HitosController } from './hito.controller';
import { HitoService } from './hito.service';

import { Hito } from 'src/hitos/entities/hito.entity';

describe('HitosController', () => {
  let controller: HitosController;
  let service: HitoService;

  const hitoMock: Hito[] = [hitoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HitosController],
      providers: [
        HitoService,
        {
          provide: getRepositoryToken(Hito),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<HitosController>(HitosController);
    service = module.get<HitoService>(HitoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service dependency should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
    it('should create a new hito', async () => {
      const createHitoDto: CreateHitoDto = {
        hito: 'Primer Paciente',
        estado: 1,
        grupo: 'crm-medicos',
        icono: 'fa fa-flag-checkered',
      };

      jest.spyOn(service, 'create').mockResolvedValue(hitoMock[0]);

      const result = await service.create(createHitoDto);
      expect(result).toEqual(hitoMock[0]);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return an empty array if there are no hitos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
    it('should return all hitos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(hitoMock);

      const result = await service.findAll();
      expect(result).toEqual(hitoMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a hito', async () => {
      const id = hitoMock[0].pkHito;

      jest.spyOn(service, 'findOne').mockResolvedValue(hitoMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(hitoMock[0]);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should update a hito', async () => {
      const id = hitoMock[0].pkHito;
      const updateHitoDto: UpdateHitoDto = {};

      jest.spyOn(service, 'update').mockResolvedValue(hitoMock[0]);
      const result = await service.update(id, updateHitoDto);
      expect(result).toEqual(hitoMock[0]);
      expect(service.update).toHaveBeenCalledWith(id, updateHitoDto);
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });
    it('should delete a hito', async () => {
      const id = hitoMock[0].pkHito;

      jest.spyOn(service, 'remove').mockResolvedValue(hitoMock[0]);

      const result = await service.remove(id);
      expect(result).toEqual(hitoMock[0]);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
