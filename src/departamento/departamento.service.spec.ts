import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';

import { DepartamentoService } from './departamento.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

import { Departamento } from 'src/departamento/entities/departamento.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { EntityNotFoundException } from 'src/shared/exceptions/entity-not-found.exception';
import { departamentoEntity } from 'src/shared/factories/departamento.factory';

describe('DepartamentoService', () => {
  let service: DepartamentoService;
  let departamentoRepository: Repository<Departamento>;
  let provinciaRepository: Repository<Provincia>;

  const departamentoMock: Departamento[] = [departamentoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartamentoService,
        {
          provide: getRepositoryToken(Departamento),
          useClass: Repository,
        },
        { provide: getRepositoryToken(Provincia), useClass: Repository },
      ],
    }).compile();

    service = module.get<DepartamentoService>(DepartamentoService);
    departamentoRepository = module.get<Repository<Departamento>>(
      getRepositoryToken(Departamento),
    );
    provinciaRepository = module.get<Repository<Provincia>>(
      getRepositoryToken(Provincia),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('departamenoRepository dependency should be defined', () => {
    expect(departamentoRepository).toBeDefined();
  });
  it('provinciaRepository dependency should be defined', () => {
    expect(provinciaRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return all departamentos', async () => {
      jest
        .spyOn(departamentoRepository, 'find')
        .mockResolvedValue(departamentoMock);

      const result = await service.findAll();
      expect(result).toEqual(departamentoMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('should return a departamento', async () => {
      jest
        .spyOn(departamentoRepository, 'findOneBy')
        .mockResolvedValue(departamentoMock[0]);

      const result = await service.findOne(departamentoMock[0].pkDepartamento);
      expect(result).toEqual(departamentoMock[0]);
    });
    it('throw EntityNotFoundException when departamento not found', async () => {
      const pkDepartamento = 'incorrect-pk';
      jest.spyOn(departamentoRepository, 'findOneBy').mockResolvedValue(null);

      await expect(() => service.findOne(pkDepartamento)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(() => service.findOne(pkDepartamento)).rejects.toThrow(
        new EntityNotFoundException(Departamento.name, pkDepartamento).message,
      );
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('should create a departamento', async () => {
      const createDepartamentoDto: CreateDepartamentoDto = {
        departamento: departamentoMock[0].departamento,
      };

      jest
        .spyOn(departamentoRepository, 'save')
        .mockResolvedValue(departamentoMock[0]);

      const result = await service.create(createDepartamentoDto);
      expect(result).toEqual(departamentoMock[0]);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });
    it('throw EntityNotFoundException when departamento not found', () => {
      const pkDepartamento = 'incorrect-pk';
      const updateDepartamentoDto: UpdateDepartamentoDto = {};

      jest.spyOn(departamentoRepository, 'findOneBy').mockResolvedValue(null);

      expect(() =>
        service.update(pkDepartamento, updateDepartamentoDto),
      ).rejects.toThrow(EntityNotFoundException);
      expect(() =>
        service.update(pkDepartamento, updateDepartamentoDto),
      ).rejects.toThrow(
        new EntityNotFoundException(Departamento.name, pkDepartamento).message,
      );
    });
    it('should update a departamento', async () => {
      const updateDepartamentoDto: UpdateDepartamentoDto = {};

      jest
        .spyOn(departamentoRepository, 'findOneBy')
        .mockResolvedValue(departamentoMock[0]);
      jest
        .spyOn(departamentoRepository, 'save')
        .mockResolvedValue(departamentoMock[0]);

      const result = await service.update(
        departamentoMock[0].pkDepartamento,
        updateDepartamentoDto,
      );
      expect(result).toEqual(departamentoMock[0]);
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });
    it('throw EntityNotFoundException when departamento not found', () => {
      const pkDepartamento = 'incorrect-pk';
      jest.spyOn(departamentoRepository, 'findOneBy').mockResolvedValue(null);
      expect(() => service.delete(pkDepartamento)).rejects.toThrow(
        EntityNotFoundException,
      );
      expect(() => service.delete(pkDepartamento)).rejects.toThrow(
        new EntityNotFoundException(Departamento.name, pkDepartamento).message,
      );
    });
    it('should delete a departamento', async () => {
      const pkDepartamento = departamentoMock[0].pkDepartamento;

      jest
        .spyOn(departamentoRepository, 'findOneBy')
        .mockResolvedValue(departamentoMock[0]);
      jest
        .spyOn(departamentoRepository, 'remove')
        .mockResolvedValue(departamentoMock[0]);

      const result = await service.delete(pkDepartamento);
      expect(result).toEqual(departamentoMock[0]);
      expect(departamentoRepository.findOneBy).toHaveBeenCalledWith({
        pkDepartamento,
      });
      expect(departamentoRepository.remove).toHaveBeenCalledWith(
        departamentoMock[0],
      );
      expect(departamentoRepository.findOneBy).toHaveBeenCalledTimes(1);
      expect(departamentoRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
  describe('findActives', () => {
    it('should be defined', () => {
      expect(service.findActives).toBeDefined();
    });
    it('should return all actives departamentos in ASC orden', async () => {
      jest
        .spyOn(departamentoRepository, 'find')
        .mockResolvedValue(departamentoMock);
      const result = await service.findActives();
      expect(result).toEqual(departamentoMock);
      expect(departamentoRepository.find).toHaveBeenCalledTimes(1);
      expect(departamentoRepository.find).toHaveBeenCalledWith({
        where: {
          eliminadoEl: IsNull(),
        },
        order: {
          departamento: 'ASC',
        },
      });
    });
  });
});
