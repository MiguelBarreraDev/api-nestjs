import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { DepartamentoController } from './departamento.controller';
import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';

import { Departamento } from 'src/departamento/entities/departamento.entity';
import { departamentoEntity } from 'src/shared/factories/departamento.factory';

describe('DepartamentoController', () => {
  let controller: DepartamentoController;
  let service: DepartamentoService;

  const departamentoMock: Departamento[] = [departamentoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartamentoController],
      providers: [
        DepartamentoService,
        { provide: getRepositoryToken(Departamento), useValue: {} },
      ],
    }).compile();

    controller = module.get<DepartamentoController>(DepartamentoController);
    service = module.get<DepartamentoService>(DepartamentoService);
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
    it('should return all departamentos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(departamentoMock);

      const result = await controller.findAll();
      expect(result).toEqual(departamentoMock);
    });
    it('should return an empty array if there are no departamentos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });
  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a departamento', async () => {
      const id = departamentoMock[0].pkDepartamento;

      jest.spyOn(service, 'findOne').mockResolvedValue(departamentoMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(departamentoMock[0]);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });
  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });
    it('should create a departamento', async () => {
      const createDepartamentoDto: CreateDepartamentoDto = {
        departamento: 'departamento',
      };

      jest.spyOn(service, 'create').mockResolvedValue(departamentoMock[0]);

      const result = await controller.create(createDepartamentoDto);
      expect(result).toEqual(departamentoMock[0]);
      expect(service.create).toHaveBeenCalledWith(createDepartamentoDto);
    });
  });
  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should update a departamento', async () => {
      const id = departamentoMock[0].pkDepartamento;
      const updateDepartamentoDto: CreateDepartamentoDto = {
        departamento: 'departamento',
      };

      jest.spyOn(service, 'update').mockResolvedValue(departamentoMock[0]);

      const result = await controller.update(id, updateDepartamentoDto);
      expect(result).toEqual(departamentoMock[0]);
      expect(service.update).toHaveBeenCalledWith(id, updateDepartamentoDto);
    });
  });
  describe('delete', () => {
    it('should be defined', () => {
      expect(controller.delete).toBeDefined();
    });
    it('should delete a departamento', async () => {
      const id = departamentoMock[0].pkDepartamento;

      jest.spyOn(service, 'delete').mockResolvedValue(departamentoMock[0]);

      const result = await controller.delete(id);
      expect(result).toEqual(departamentoMock[0]);
      expect(service.delete).toHaveBeenCalledWith(id);
      expect(service.delete).toHaveBeenCalledTimes(1);
    });
  });
});
