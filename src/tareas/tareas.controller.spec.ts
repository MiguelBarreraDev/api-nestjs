import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { tareasEntity } from './factories/tareas.factory';
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';

import { Tareas } from 'src/tareas/entities/tareas.entity';

describe('TareasController', () => {
  let controller: TareasController;
  let service: TareasService;

  const tareasMock: Tareas[] = [tareasEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TareasController],
      providers: [
        TareasService,
        { provide: getRepositoryToken(Tareas), useValue: {} },
      ],
    }).compile();

    controller = module.get<TareasController>(TareasController);
    service = module.get<TareasService>(TareasService);
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
    it('should create a tarea', async () => {
      const createTareaDto: CreateTareaDto = {
        tarea: 'Tarea 1',
        fkCategoria: 2,
        fkUsuarioAsignador: 3,
        fkUsuarioEjecutor: 4,
      };

      jest.spyOn(service, 'create').mockResolvedValue(tareasMock[0]);

      const result = await controller.create(createTareaDto);
      expect(result).toEqual(tareasMock[0]);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return an empty array if there are no tareas', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
    it('should return all tareas', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(tareasMock);
      const result = await controller.findAll();
      expect(result).toEqual(tareasMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a tareas', async () => {
      const id = tareasMock[0].pkTarea;

      jest.spyOn(service, 'findOne').mockResolvedValue(tareasMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(tareasMock[0]);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should update a tarea', async () => {
      const id = tareasMock[0].pkTarea;
      const updateTareaDto: UpdateTareaDto = {};

      jest.spyOn(service, 'update').mockResolvedValue(tareasMock[0]);

      const result = await controller.update(id, updateTareaDto);
      expect(result).toEqual(tareasMock[0]);
      expect(service.update).toHaveBeenCalledWith(id, updateTareaDto);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });
    it('should remove a tarea', async () => {
      const id = tareasMock[0].pkTarea;

      jest.spyOn(service, 'remove').mockResolvedValue(tareasMock[0]);

      const result = await controller.remove(id);
      expect(result).toEqual(tareasMock[0]);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
