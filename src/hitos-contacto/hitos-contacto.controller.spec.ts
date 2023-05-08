import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { hitosContactoEntity } from './factories/hitos-contacto.factory';
import { HitosContactoController } from './hitos-contacto.controller';
import { HitosContactoService } from './hitos-contacto.service';

import { HitosContacto } from 'src/hitos-contacto/entities/hitos-contacto.entity';

describe('HitosContactoController', () => {
  let controller: HitosContactoController;
  let service: HitosContactoService;

  const hitosContactoMock: HitosContacto[] = [hitosContactoEntity()];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HitosContactoController],
      providers: [
        HitosContactoService,
        {
          provide: getRepositoryToken(HitosContacto),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<HitosContactoController>(HitosContactoController);
    service = module.get<HitosContactoService>(HitosContactoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(controller.findAll).toBeDefined();
    });
    it('should return all hitosContactos', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(hitosContactoMock);

      const result = await controller.findAll();
      expect(result).toEqual(hitosContactoMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });
    it('should return a hitosContacto', async () => {
      const id = hitosContactoMock[0].pkHitoContacto;
      jest.spyOn(service, 'findOne').mockResolvedValue(hitosContactoMock[0]);

      const result = await controller.findOne(id);
      expect(result).toEqual(hitosContactoMock[0]);
    });
  });
});
