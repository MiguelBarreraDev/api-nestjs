import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateVisitaMedicaDto } from './dto/create-visita-medica.dto';
import { UpdateVisitaMedicaDto } from './dto/update-visita-medica.dto';
import { VisitaMedicaService } from './visita-medica.service';

import { EntityNotFoundException } from 'src/shared/exceptions';
import { visitaMedicaEntity } from 'src/shared/factories/visita-medica.factory';
import { VisitaMedica } from 'src/visita-medica/entities/visita-medica.entity';

describe('VisitaMedicaService', () => {
  let service: VisitaMedicaService;
  let visitaMedicaRepository: Repository<VisitaMedica>;

  const visitaMedicaMock: VisitaMedica[] = [visitaMedicaEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitaMedicaService,
        {
          provide: getRepositoryToken(VisitaMedica),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VisitaMedicaService>(VisitaMedicaService);
    visitaMedicaRepository = module.get<Repository<VisitaMedica>>(
      getRepositoryToken(VisitaMedica),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('visitaMedicaRepository dependency should be defined', () => {
    expect(visitaMedicaRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('should create a new visita medica', async () => {
      const createVisitaMedicaDto: CreateVisitaMedicaDto = {
        fkUsuario: 145,
        fkMedico: '01572a63f9c98e55.93094572',
        fecha: '2021-12-14T16:50:55.000Z',
      };

      jest
        .spyOn(visitaMedicaRepository, 'save')
        .mockResolvedValue(visitaMedicaMock[0]);

      const result = await service.create(createVisitaMedicaDto);
      expect(result).toEqual(visitaMedicaMock[0]);
    });
  });
  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return all visita medica', async () => {
      jest
        .spyOn(visitaMedicaRepository, 'find')
        .mockResolvedValue(visitaMedicaMock);

      const result = await service.findAll();
      expect(result).toEqual(visitaMedicaMock);
    });
    it('should return an empty array if there are no visitas médicas', async () => {
      jest.spyOn(visitaMedicaRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('should return a visita medica', async () => {
      const pkVisitaMedica = visitaMedicaMock[0].pkVisitaMedica;

      jest
        .spyOn(visitaMedicaRepository, 'findOneBy')
        .mockResolvedValue(visitaMedicaMock[0]);

      const result = await service.findOne(pkVisitaMedica);
      expect(result).toEqual(visitaMedicaMock[0]);
    });
    it('throw EntityNotFoundException when the visitaMedica is not found', async () => {
      const pkVisitaMedica = 'incorrect-pk';

      jest.spyOn(visitaMedicaRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(pkVisitaMedica)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.findOne(pkVisitaMedica)).rejects.toThrow(
        new EntityNotFoundException(VisitaMedica.name, pkVisitaMedica),
      );
    });
  });
  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });
    it('should update a visita medica', async () => {
      const pkVisitaMedica = visitaMedicaMock[0].pkVisitaMedica;
      const updateVisitaMedicaDto: UpdateVisitaMedicaDto = {};

      jest
        .spyOn(visitaMedicaRepository, 'findOneBy')
        .mockResolvedValue(visitaMedicaMock[0]);
      jest
        .spyOn(visitaMedicaRepository, 'save')
        .mockResolvedValue(visitaMedicaMock[0]);

      const result = await service.update(
        pkVisitaMedica,
        updateVisitaMedicaDto,
      );
      expect(result).toEqual(visitaMedicaMock[0]);
    });
    it('throw EntityNotFoundException when the visitaMedica is not found', async () => {
      const pkVisitaMedica = 'incorrect-pk';
      const updateVisitaMedicaDto: UpdateVisitaMedicaDto = {};

      jest.spyOn(visitaMedicaRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(visitaMedicaRepository, 'save').mockResolvedValue(null);

      await expect(
        service.update(pkVisitaMedica, updateVisitaMedicaDto),
      ).rejects.toThrow(EntityNotFoundException);
      await expect(
        service.update(pkVisitaMedica, updateVisitaMedicaDto),
      ).rejects.toThrow(
        new EntityNotFoundException(VisitaMedica.name, pkVisitaMedica).message,
      );
    });
  });
  describe('remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });
    it('should remove a visita medica', async () => {
      const pkVisitaMedica = visitaMedicaMock[0].pkVisitaMedica;

      jest
        .spyOn(visitaMedicaRepository, 'findOneBy')
        .mockResolvedValue(visitaMedicaMock[0]);
      jest
        .spyOn(visitaMedicaRepository, 'remove')
        .mockResolvedValue(visitaMedicaMock[0]);

      const result = await service.remove(pkVisitaMedica);
      expect(result).toEqual(visitaMedicaMock[0]);
    });
    it('throw EntityNotFoundException when the visitaMedica is not found', async () => {
      const pkVisitaMedica = 'incorrect-pk';

      jest.spyOn(visitaMedicaRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(visitaMedicaRepository, 'remove').mockResolvedValue(null);

      await expect(service.remove(pkVisitaMedica)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.remove(pkVisitaMedica)).rejects.toThrow(
        new EntityNotFoundException(VisitaMedica.name, pkVisitaMedica).message,
      );
    });
  });

  describe('findByVisitadoresId', () => {
    it('should be defined', () => {
      expect(service.findByVisitadoresId).toBeDefined();
    });
    it('should return visitas medicas, related to the ids received for parameters', async () => {
      const visitadoresId = [1, 2, 3, 4, 5, 6];

      jest
        .spyOn(visitaMedicaRepository, 'findBy')
        .mockResolvedValue(visitaMedicaMock);

      const result = await service.findByVisitadoresId(visitadoresId);
      expect(result).toEqual(visitaMedicaMock);
    });
    it('should return an empty array if there are no visitas médicas related to the visitor ids', async () => {
      const visitadoresId = [1, 2, 3, 4, 5, 6];

      jest.spyOn(visitaMedicaRepository, 'findBy').mockResolvedValue([]);

      const result = await service.findByVisitadoresId(visitadoresId);
      expect(result).toEqual([]);
      expect(visitaMedicaRepository.findBy).toHaveBeenCalledWith({
        fkUsuario: In(visitadoresId),
      });
    });
  });

  describe('countByVisitadoresId', () => {
    it('should be defined', () => {
      expect(service.countByVisitadoresId).toBeDefined();
    });
    it('should return the number of visitas medicas, related to the visitor ids', async () => {
      const visitadoresId = [1, 2, 3, 4, 5, 6];

      jest
        .spyOn(visitaMedicaRepository, 'countBy')
        .mockResolvedValue(visitaMedicaMock.length);

      const result = await service.countByVisitadoresId(visitadoresId);
      expect(result).toEqual(visitaMedicaMock.length);
      expect(visitaMedicaRepository.countBy).toHaveBeenCalledWith({
        fkUsuario: In(visitadoresId),
      });
    });
    it('should return 0 if there are no visitas médicas related to the visitor ids', async () => {
      const visitadoresId = [1, 2, 3, 4, 5, 6];

      jest.spyOn(visitaMedicaRepository, 'countBy').mockResolvedValue(0);

      const result = await service.countByVisitadoresId(visitadoresId);
      expect(result).toEqual(0);
    });
  });
  describe('countOfTheLastMonth', () => {
    it('should be defined', () => {
      expect(service.countOfTheLastMonth).toBeDefined();
    });
    it('should return the number of visitas médicas in the last month, related to the ids visitors', async () => {
      const visitadoresId = [1, 2, 3, 4, 5, 6];

      jest
        .spyOn(visitaMedicaRepository, 'count')
        .mockResolvedValue(visitaMedicaMock.length);

      const result = await service.countOfTheLastMonth(visitadoresId);
      expect(result).toEqual(visitaMedicaMock.length);
      expect(visitaMedicaRepository.count).toHaveBeenCalledTimes(1);
    });
  });
});
