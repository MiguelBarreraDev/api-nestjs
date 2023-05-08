import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { tareasEntity } from './factories/tareas.factory';
import { TareasService } from './tareas.service';

import { EntityNotFoundException } from 'src/shared/exceptions';
import { Tareas } from 'src/tareas/entities/tareas.entity';

describe('TareasService', () => {
  let service: TareasService;
  let tareasRepository: Repository<Tareas>;

  const tareasMock: Tareas[] = [tareasEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TareasService,
        {
          provide: getRepositoryToken(Tareas),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TareasService>(TareasService);
    tareasRepository = module.get<Repository<Tareas>>(
      getRepositoryToken(Tareas),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('tareasRepository dependency should be defined', () => {
    expect(tareasRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });
    it('should create a tarea', async () => {
      const createTareaDto: CreateTareaDto = {
        tarea: 'Tarea 1',
        fkCategoria: 2,
        fkUsuarioAsignador: 3,
        fkUsuarioEjecutor: 4,
      };

      jest.spyOn(tareasRepository, 'save').mockResolvedValue(tareasMock[0]);

      const result = await service.create(createTareaDto);
      expect(result).toEqual(tareasMock[0]);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });
    it('should return all tareas', async () => {
      jest.spyOn(tareasRepository, 'find').mockResolvedValue(tareasMock);

      const result = await service.findAll();
      expect(result).toEqual(tareasMock);
    });
    it('should return an empty array if there are no tareas', async () => {
      jest.spyOn(tareasRepository, 'find').mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });
  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });
    it('should return a tarea', async () => {
      const pkTarea = tareasMock[0].pkTarea;

      jest
        .spyOn(tareasRepository, 'findOneBy')
        .mockResolvedValue(tareasMock[0]);

      const result = await service.findOne(pkTarea);
      expect(result).toEqual(tareasMock[0]);
    });
    it('throw EntityNotFoundException when tarea not found', async () => {
      const pkTarea = 'incorrect-pk';

      jest.spyOn(tareasRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.findOne(pkTarea)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.findOne(pkTarea)).rejects.toThrow(
        new EntityNotFoundException(Tareas.name, pkTarea).message,
      );
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });
    it('should update a tarea', async () => {
      const pkTarea = tareasMock[0].pkTarea;
      const updateTareaDto: UpdateTareaDto = {};

      jest
        .spyOn(tareasRepository, 'findOneBy')
        .mockResolvedValue(tareasMock[0]);
      jest.spyOn(tareasRepository, 'save').mockResolvedValue(tareasMock[0]);

      const result = await service.update(pkTarea, updateTareaDto);
      expect(result).toEqual(tareasMock[0]);
    });
    it('throw EntityNotFoundException when tarea not found', async () => {
      const pkTarea = 'incorrect-pk';
      const updateTareaDto: UpdateTareaDto = {};

      jest.spyOn(tareasRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(tareasRepository, 'save').mockResolvedValue(tareasMock[0]);

      await expect(service.update(pkTarea, updateTareaDto)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.update(pkTarea, updateTareaDto)).rejects.toThrow(
        new EntityNotFoundException(Tareas.name, pkTarea).message,
      );
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(service.remove).toBeDefined();
    });
    it('should remove a tarea', async () => {
      const pkTarea = tareasMock[0].pkTarea;

      jest
        .spyOn(tareasRepository, 'findOneBy')
        .mockResolvedValue(tareasMock[0]);
      jest.spyOn(tareasRepository, 'remove').mockResolvedValue(tareasMock[0]);

      const result = await service.remove(pkTarea);
      expect(result).toEqual(tareasMock[0]);
    });
    it('throw EntityNotFoundException when tarea not found', async () => {
      const pkTarea = 'incorrect-pk';

      jest.spyOn(tareasRepository, 'findOneBy').mockResolvedValue(null);
      jest.spyOn(tareasRepository, 'remove').mockResolvedValue(null);

      await expect(service.remove(pkTarea)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.remove(pkTarea)).rejects.toThrow(
        new EntityNotFoundException(Tareas.name, pkTarea).message,
      );
    });
  });
});
