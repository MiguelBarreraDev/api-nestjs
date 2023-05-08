import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTipoContactoDto } from './dto/create-tipo-contacto.dto';
import { UpdateTipoContactoDto } from './dto/update-tipo-contacto.dto';
import { tipoContactoEntity } from './factories/tipo-contacto.factory';
import { TipoContactoService } from './tipo-contacto.service';

import { EntityNotFoundException } from 'src/shared/exceptions';
import { TipoContacto } from 'src/tipo-contacto/entities/tipo-contacto.entity';

describe('TipoContactoService', () => {
  let service: TipoContactoService;
  let tipoContactoRepository: Repository<TipoContacto>;

  const tipoContactoMock: TipoContacto[] = [tipoContactoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoContactoService,
        {
          provide: getRepositoryToken(TipoContacto),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TipoContactoService>(TipoContactoService);
    tipoContactoRepository = module.get<Repository<TipoContacto>>(
      getRepositoryToken(TipoContacto),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('tipoContactoRepository should be defined', () => {
    expect(tipoContactoRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('should create a tipoContacto', async () => {
      const createTipoContactoDto: CreateTipoContactoDto = {
        tipoContacto: 'whatsapp',
      };

      jest
        .spyOn(tipoContactoRepository, 'save')
        .mockResolvedValue(tipoContactoMock[0]);

      const result = await service.create(createTipoContactoDto);
      expect(result).toEqual(tipoContactoMock[0]);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return all tipoContactos', async () => {
      jest
        .spyOn(tipoContactoRepository, 'find')
        .mockResolvedValue(tipoContactoMock);

      const result = await service.findAll();
      expect(result).toEqual(tipoContactoMock);
    });
    it('should return an empty array if there are no tipoContacto', async () => {
      jest.spyOn(tipoContactoRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('throw EntitynotFoundException when tipoContacto is not found', () => {
      const pkTipoContacto = 'incorrect-pk';

      jest.spyOn(tipoContactoRepository, 'findOneBy').mockResolvedValue(null);

      expect(service.findOne(pkTipoContacto)).rejects.toThrow(
        EntityNotFoundException,
      );
      expect(service.findOne(pkTipoContacto)).rejects.toThrow(
        new EntityNotFoundException(TipoContacto.name, pkTipoContacto).message,
      );
    });
    it('should return a tipoContacto', async () => {
      const pkTipoContacto = tipoContactoMock[0].pkTipoContacto;

      jest
        .spyOn(tipoContactoRepository, 'findOneBy')
        .mockResolvedValue(tipoContactoMock[0]);

      const result = await service.findOne(pkTipoContacto);
      expect(result).toEqual(tipoContactoMock[0]);
    });
  });
  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });
    it('throw EntitynotFoundException when tipoContacto is not found', () => {
      const pkTipoContacto = 'incorrect-pk';
      const updateTipoContactoDto: UpdateTipoContactoDto = {};

      jest.spyOn(tipoContactoRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(tipoContactoRepository, 'save').mockResolvedValue(null);

      expect(
        service.update(pkTipoContacto, updateTipoContactoDto),
      ).rejects.toThrow(EntityNotFoundException);
      expect(
        service.update(pkTipoContacto, updateTipoContactoDto),
      ).rejects.toThrow(
        new EntityNotFoundException(TipoContacto.name, pkTipoContacto).message,
      );
    });
    it('should update a tipoContacto', async () => {
      const pkTipoContacto = tipoContactoMock[0].pkTipoContacto;
      const updateTipoContactoDto: UpdateTipoContactoDto = {};

      jest
        .spyOn(tipoContactoRepository, 'findOneBy')
        .mockResolvedValue(tipoContactoMock[0]);
      jest
        .spyOn(tipoContactoRepository, 'save')
        .mockResolvedValue(tipoContactoMock[0]);

      const result = await service.update(
        pkTipoContacto,
        updateTipoContactoDto,
      );
      expect(result).toEqual(tipoContactoMock[0]);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });
    it('throw EntityNotFoundException when tipoContacto is not found', () => {
      const pkTipoContacto = 'incorrect-pk';
      jest.spyOn(tipoContactoRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(tipoContactoRepository, 'remove').mockResolvedValue(null);
      expect(service.remove(pkTipoContacto)).rejects.toThrow(
        EntityNotFoundException,
      );
      expect(service.remove(pkTipoContacto)).rejects.toThrow(
        new EntityNotFoundException(TipoContacto.name, pkTipoContacto).message,
      );
    });
    it('should remove a tipoContacto', async () => {
      const pkTipoContacto = tipoContactoMock[0].pkTipoContacto;

      jest
        .spyOn(tipoContactoRepository, 'findOneBy')
        .mockResolvedValue(tipoContactoMock[0]);
      jest
        .spyOn(tipoContactoRepository, 'remove')
        .mockResolvedValue(tipoContactoMock[0]);

      const result = await service.remove(pkTipoContacto);
      expect(result).toEqual(tipoContactoMock[0]);
    });
  });
});
