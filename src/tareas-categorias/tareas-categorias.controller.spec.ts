import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateTareasCategoriaDto } from './dto/create-tareas-categoria.dto';
import { UpdateTareasCategoriaDto } from './dto/update-tareas-categoria.dto';
import { tareasCategoriasEntity } from './factories/tareas-categorias.factory';
import { TareasCategoriasController } from './tareas-categorias.controller';
import { TareasCategoriasService } from './tareas-categorias.service';

import { TareasCategorias } from 'src/tareas-categorias/entities/tareas-categorias.entity';

describe('TareasCategoriasController', () => {
  let controller: TareasCategoriasController;
  let service: TareasCategoriasService;

  const tareasCategoriasMock: TareasCategorias[] = [tareasCategoriasEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TareasCategoriasController],
      providers: [
        TareasCategoriasService,
        { provide: getRepositoryToken(TareasCategorias), useValue: {} },
      ],
    }).compile();

    controller = module.get<TareasCategoriasController>(
      TareasCategoriasController,
    );
    service = module.get<TareasCategoriasService>(TareasCategoriasService);
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
    it('should create a new category', async () => {
      const createTareasCategoriaDto: CreateTareasCategoriaDto = {
        categoria: 'General',
      };

      jest.spyOn(service, 'create').mockResolvedValue(tareasCategoriasMock[0]);

      const result = await controller.create(createTareasCategoriaDto);
      expect(result).toEqual(tareasCategoriasMock[0]);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return all categories', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(tareasCategoriasMock);

      const result = await controller.findAll();
      expect(result).toEqual(tareasCategoriasMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a category', async () => {
      const id = tareasCategoriasMock[0].pkTareasCategoria;

      jest.spyOn(service, 'findOne').mockResolvedValue(tareasCategoriasMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(tareasCategoriasMock[0]);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should update a category', async () => {
      const id = tareasCategoriasMock[0].pkTareasCategoria;
      const updateTareasCategoriaDto: UpdateTareasCategoriaDto = {};

      jest.spyOn(service, 'update').mockResolvedValue(tareasCategoriasMock[0]);

      const result = await controller.update(id, updateTareasCategoriaDto);
      expect(result).toEqual(tareasCategoriasMock[0]);
      expect(service.update).toHaveBeenCalledWith(id, updateTareasCategoriaDto);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });
    it('should remove a category', async () => {
      const id = tareasCategoriasMock[0].pkTareasCategoria;

      jest.spyOn(service, 'remove').mockResolvedValue(tareasCategoriasMock[0]);

      const result = await controller.remove(id);
      expect(result).toEqual(tareasCategoriasMock[0]);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
