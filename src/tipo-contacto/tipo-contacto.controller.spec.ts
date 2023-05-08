import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CreateTipoContactoDto } from './dto/create-tipo-contacto.dto';
import { tipoContactoEntity } from './factories/tipo-contacto.factory';
import { TipoContactoController } from './tipo-contacto.controller';
import { TipoContactoService } from './tipo-contacto.service';

import { TipoContacto } from 'src/tipo-contacto/entities/tipo-contacto.entity';

describe('TipoContactoController', () => {
  let controller: TipoContactoController;
  let service: TipoContactoService;

  const tipoContactoMock: TipoContacto[] = [tipoContactoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoContactoController],
      providers: [
        TipoContactoService,
        { provide: getRepositoryToken(TipoContacto), useValue: {} },
      ],
    }).compile();

    controller = module.get<TipoContactoController>(TipoContactoController);
    service = module.get<TipoContactoService>(TipoContactoService);
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
    it('should create a new tipoContacto', async () => {
      const createTipoContactoDto: CreateTipoContactoDto = {
        tipoContacto: 'whatsapp',
      };

      jest.spyOn(service, 'create').mockResolvedValue(tipoContactoMock[0]);

      const result = await controller.create(createTipoContactoDto);
      expect(result).toEqual(tipoContactoMock[0]);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return an empty array if there are no tipoContacto', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
    it('should return all tipoContactos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(tipoContactoMock);

      const result = await controller.findAll();
      expect(result).toEqual(tipoContactoMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a tipoContacto', async () => {
      const id = tipoContactoMock[0].pkTipoContacto;

      jest.spyOn(service, 'findOne').mockResolvedValue(tipoContactoMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(tipoContactoMock[0]);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(controller.update).toBeDefined();
    });
    it('should update a tipoContacto', async () => {
      const id = tipoContactoMock[0].pkTipoContacto;
      const updateTipoContactoDto: CreateTipoContactoDto = {
        tipoContacto: 'whatsapp',
      };
      jest.spyOn(service, 'update').mockResolvedValue(tipoContactoMock[0]);

      const result = await controller.update(id, updateTipoContactoDto);
      expect(result).toEqual(tipoContactoMock[0]);
      expect(service.update).toHaveBeenCalledWith(id, updateTipoContactoDto);
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(controller.remove).toBeDefined();
    });
    it('should remove a tipoContacto', async () => {
      const id = tipoContactoMock[0].pkTipoContacto;

      jest.spyOn(service, 'remove').mockResolvedValue(tipoContactoMock[0]);

      const result = await controller.remove(id);
      expect(result).toEqual(tipoContactoMock[0]);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
