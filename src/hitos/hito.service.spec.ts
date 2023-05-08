import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateHitoDto } from './dto/create-hito.dto';
import { UpdateHitoDto } from './dto/update-hito.dto';
import { hitoEntity } from './factories/hito.factory';
import { HitoService } from './hito.service';

import { Hito } from 'src/hitos/entities/hito.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

describe('HitoService', () => {
  let service: HitoService;
  let hitoRepository: Repository<Hito>;

  const hitoMock: Hito[] = [hitoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HitoService,
        {
          provide: getRepositoryToken(Hito),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<HitoService>(HitoService);
    hitoRepository = module.get<Repository<Hito>>(getRepositoryToken(Hito));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('histosRepository should be defined', () => {
    expect(hitoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return all hitos', async () => {
      jest.spyOn(hitoRepository, 'find').mockResolvedValue(hitoMock);

      const result = await service.findAll();
      expect(result).toEqual(hitoMock);
    });
    it('should return an empty array if there are no data exists', async () => {
      jest.spyOn(hitoRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('should return one hito', async () => {
      const pkHito = hitoMock[0].pkHito;

      jest.spyOn(hitoRepository, 'findOneBy').mockResolvedValue(hitoMock[0]);

      const result = await service.findOne(pkHito);
      expect(result).toEqual(hitoMock[0]);
    });
    it('throw EntityNotFoundException when the hito not exist', async () => {
      const pkHito = 'incorrect_id';

      jest.spyOn(hitoRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(pkHito)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.findOne(pkHito)).rejects.toThrow(
        new EntityNotFoundException(Hito.name, pkHito).message,
      );
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('should create a new hito', async () => {
      const createHitoDto: CreateHitoDto = {
        hito: 'Primer Paciente',
        metrica: 1,
        estado: 1,
        grupo: 'crm-medicos',
        icono: 'fa fa-flag-checkered',
        color: '#000000',
      };

      jest.spyOn(hitoRepository, 'save').mockResolvedValue(createHitoDto[0]);

      const result = await service.create(createHitoDto);
      expect(result).toEqual(createHitoDto[0]);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });
    it('should update a hito', async () => {
      const pkHito = hitoMock[0].pkHito;
      const updateHitoDto: UpdateHitoDto = {};

      jest.spyOn(hitoRepository, 'findOneBy').mockResolvedValue(hitoMock[0]);
      jest.spyOn(hitoRepository, 'save').mockResolvedValue(hitoMock[0]);

      const result = await service.update(pkHito, updateHitoDto);
      expect(result).toEqual(hitoMock[0]);
    });
    it('throw EntityNotFoundException when the hito not exist', async () => {
      const pkHito = 'incorrect_id';
      const updateHitoDto: UpdateHitoDto = {};

      jest.spyOn(hitoRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(hitoRepository, 'save').mockResolvedValue(null);

      await expect(service.update(pkHito, updateHitoDto)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.update(pkHito, updateHitoDto)).rejects.toThrow(
        new EntityNotFoundException(Hito.name, pkHito).message,
      );
    });
  });
  describe('delete', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });
    it('should delete a hito', async () => {
      const pkHito = hitoMock[0].pkHito;

      jest.spyOn(hitoRepository, 'findOneBy').mockResolvedValue(hitoMock[0]);
      jest.spyOn(hitoRepository, 'remove').mockResolvedValue(hitoMock[0]);

      const result = await service.remove(pkHito);
      expect(result).toEqual(hitoMock[0]);
    });
    it('throw EntityNotFoundException when the hito not exist', async () => {
      const pkHito = 'incorrect_id';

      jest.spyOn(hitoRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.remove(pkHito)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.remove(pkHito)).rejects.toThrow(
        new EntityNotFoundException(Hito.name, pkHito).message,
      );
    });
  });
});
