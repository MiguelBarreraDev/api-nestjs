import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTareasCategoriaDto } from './dto/create-tareas-categoria.dto';
import { UpdateTareasCategoriaDto } from './dto/update-tareas-categoria.dto';
import { TareasCategoriasService } from './tareas-categorias.service';

import { EntityNotFoundException } from 'src/shared/exceptions';
import { TareasCategorias } from 'src/tareas-categorias/entities/tareas-categorias.entity';

describe('TareasCategoriasService', () => {
  let service: TareasCategoriasService;
  let tareasCategoriasRepository: Repository<TareasCategorias>;

  const tareasCategoriasMock: TareasCategorias[] = [
    {
      pkTareasCategoria: 'dcb1c1d5-7432-4181-8baf-a5b6cb1e7931',
      pkTmp: 1,
      categoria: 'General',
      creadoEl: new Date('2019-04-21T15:48:28.000Z'),
      actualizadoEl: new Date('2023-02-24T18:02:21.671Z'),
      eliminadoEl: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TareasCategoriasService,
        {
          provide: getRepositoryToken(TareasCategorias),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TareasCategoriasService>(TareasCategoriasService);
    tareasCategoriasRepository = module.get<Repository<TareasCategorias>>(
      getRepositoryToken(TareasCategorias),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('tareasCategoriasRepository dependency should be defined', () => {
    expect(tareasCategoriasRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return all tareasCategorias', async () => {
      jest
        .spyOn(tareasCategoriasRepository, 'find')
        .mockResolvedValue(tareasCategoriasMock);

      const result = await service.findAll();
      expect(result).toEqual(tareasCategoriasMock);
    });
    it('should return an empty array if there are no tareasCategorias', async () => {
      jest.spyOn(tareasCategoriasRepository, 'find').mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('should return a tareasCategorias', async () => {
      const pkTareasCategoria = tareasCategoriasMock[0].pkTareasCategoria;

      jest
        .spyOn(tareasCategoriasRepository, 'findOneBy')
        .mockResolvedValue(tareasCategoriasMock[0]);

      const result = await service.findOne(pkTareasCategoria);
      expect(result).toEqual(tareasCategoriasMock[0]);
    });
    it('throw EntityNotFoundException when tareasCategorías not found', async () => {
      const pkTareasCategoria = 'incorrect-id';

      jest
        .spyOn(tareasCategoriasRepository, 'findOneBy')
        .mockResolvedValue(null);

      await expect(service.findOne(pkTareasCategoria)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.findOne(pkTareasCategoria)).rejects.toThrow(
        new EntityNotFoundException(TareasCategorias.name, pkTareasCategoria),
      );
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('should create a tareasCategorias', async () => {
      const createTareasCategoriaDto: CreateTareasCategoriaDto = {
        categoria: tareasCategoriasMock[0].categoria,
      };

      jest
        .spyOn(tareasCategoriasRepository, 'save')
        .mockResolvedValue(tareasCategoriasMock[0]);

      const result = await service.create(createTareasCategoriaDto);
      expect(result).toEqual(tareasCategoriasMock[0]);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });
    it('should update a tareasCategorias', async () => {
      const pkTareasCategoria = tareasCategoriasMock[0].pkTareasCategoria;
      const updateTareasCategoriaDto: UpdateTareasCategoriaDto = {};

      jest
        .spyOn(tareasCategoriasRepository, 'findOneBy')
        .mockResolvedValue(tareasCategoriasMock[0]);
      jest
        .spyOn(tareasCategoriasRepository, 'save')
        .mockResolvedValue(tareasCategoriasMock[0]);

      const result = await service.update(
        pkTareasCategoria,
        updateTareasCategoriaDto,
      );
      expect(result).toEqual(tareasCategoriasMock[0]);
    });
    it('should throw EntityNotFoundException when tareasCategorias not found', async () => {
      const pkTareasCategoria = 'incorrect-id';
      const updateTareasCategoriaDto: UpdateTareasCategoriaDto = {};

      jest
        .spyOn(tareasCategoriasRepository, 'findOneBy')
        .mockResolvedValue(null);
      jest
        .spyOn(tareasCategoriasRepository, 'save')
        .mockResolvedValue(tareasCategoriasMock[0]);

      expect(
        service.update(pkTareasCategoria, updateTareasCategoriaDto),
      ).rejects.toThrow(EntityNotFoundException);
      expect(
        service.update(pkTareasCategoria, updateTareasCategoriaDto),
      ).rejects.toThrow(
        new EntityNotFoundException(TareasCategorias.name, pkTareasCategoria)
          .message,
      );
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });
    it('should remove a tareasCategorias', async () => {
      const pkTareasCategoria = tareasCategoriasMock[0].pkTareasCategoria;

      jest
        .spyOn(tareasCategoriasRepository, 'findOneBy')
        .mockResolvedValue(tareasCategoriasMock[0]);
      jest
        .spyOn(tareasCategoriasRepository, 'remove')
        .mockResolvedValue(tareasCategoriasMock[0]);

      const result = await service.remove(pkTareasCategoria);
      expect(result).toEqual(tareasCategoriasMock[0]);
    });
    it('should throw EntityNotFoundException when tareasCategorias not found', async () => {
      const pkTareasCategoria = 'incorrect-id';

      jest
        .spyOn(tareasCategoriasRepository, 'findOneBy')
        .mockResolvedValue(null);

      await expect(service.remove(pkTareasCategoria)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.remove(pkTareasCategoria)).rejects.toThrow(
        new EntityNotFoundException(TareasCategorias.name, pkTareasCategoria),
      );
    });
  });
});
