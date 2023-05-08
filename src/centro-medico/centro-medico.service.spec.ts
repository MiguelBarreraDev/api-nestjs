import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CentroMedicoService } from './centro-medico.service';
import { CreateCentroMedicoDto } from './dto/create-centro-medico.dto';
import { UpdateCentroMedicoDto } from './dto/update-centro-medico.dto';
import { CentroMedicoSearchRepository } from './repositories/centro-medico-search.repository';

import { CentroMedico } from 'src/centro-medico/entities/centro-medico.entity';
import { EntityNotFoundException } from 'src/shared/exceptions';

describe('CentroMedicoService', () => {
  let service: CentroMedicoService;
  let centroMedicoRepository: Repository<CentroMedico>;

  const centroMedicoMock: CentroMedico[] = [
    {
      pkCentroMedico: '413efc80-5f84-4096-81b0-94ee4a8532e1',
      pkTmp: '015796500a699900.57369041',
      centroMedico: 'INSTITUTO NACIONAL  DE CIENCIAS NEUROLOGICAS',
      fkTipoCentroMedico: 6,
      direccion: 'JR. ANCASH 1271 CERCADO DE LIMA ',
      potencial: '2',
      detalle: '',
      fkDepartamento: 15,
      fkProvincia: 127,
      fkDistrito: 1251,
      referencia: '',
      telefono: '411 7700',
      creadoEl: new Date('2023-02-23T11:54:03.920Z'),
      actualizadoEl: new Date('2023-02-23T11:54:03.920Z'),
      eliminadoEl: null,
    },
    {
      pkCentroMedico: 'd56d2ae1-7be2-4d6f-abb3-94c37c34d2d7',
      pkTmp: '0157a101324c9995.96873580',
      centroMedico: 'MEDITAS POLICLINICOS',
      fkTipoCentroMedico: 4,
      direccion: 'CARLOs Alberto Izaguirre 133, Lima',
      potencial: '1',
      detalle: '',
      fkDepartamento: 15,
      fkProvincia: 127,
      fkDistrito: 1262,
      referencia: 'CERCA CLINICA JESUS DEL NORTE ',
      telefono: '521 4827',
      creadoEl: new Date('2023-02-23T11:54:03.920Z'),
      actualizadoEl: new Date('2023-02-23T11:54:03.920Z'),
      eliminadoEl: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CentroMedicoSearchRepository,
        CentroMedicoService,
        {
          provide: getRepositoryToken(CentroMedico),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CentroMedicoService>(CentroMedicoService);
    centroMedicoRepository = module.get<Repository<CentroMedico>>(
      getRepositoryToken(CentroMedico),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('centroMedicoRepository should be defined', () => {
    expect(centroMedicoRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service.findAll).toBeDefined();
    });

    it('should return all centros medicos', async () => {
      jest
        .spyOn(centroMedicoRepository, 'find')
        .mockResolvedValue(centroMedicoMock);
      expect(await service.findAll()).toEqual(centroMedicoMock);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return the centro medico if exists', async () => {
      jest
        .spyOn(centroMedicoRepository, 'findOneBy')
        .mockResolvedValue(centroMedicoMock[0]);

      expect(await service.findOne(centroMedicoMock[0].pkCentroMedico)).toEqual(
        centroMedicoMock[0],
      );
    });

    it('throw EntityNotFoundException when centro medico is not found', async () => {
      jest.spyOn(centroMedicoRepository, 'findOneBy').mockResolvedValue(null);

      const pkCentroMedico = '123';

      await expect(service.findOne(pkCentroMedico)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.findOne(pkCentroMedico)).rejects.toThrow(
        new EntityNotFoundException(CentroMedico.name, pkCentroMedico),
      );
    });
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should create a centro medico', async () => {
      const createCentroMedicoDto: CreateCentroMedicoDto = {
        centroMedico: 'INSTITUTO NACIONAL  DE CIENCIAS NEUROLOGICAS',
        fkTipoCentroMedico: 6,
        direccion: 'JR. ANCASH 1271 CERCADO DE LIMA ',
        potencial: '2',
        detalle: '',
        fkDepartamento: 15,
        fkProvincia: 127,
        fkDistrito: 1251,
        referencia: '',
        telefono: '411 7700',
      };

      jest
        .spyOn(centroMedicoRepository, 'save')
        .mockResolvedValue(centroMedicoMock[0]);

      expect(await service.create(createCentroMedicoDto)).toEqual(
        centroMedicoMock[0],
      );
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(service.update).toBeDefined();
    });
    it('should update a centro medico', async () => {
      const updateCentroMedicoDto: UpdateCentroMedicoDto = {
        potencial: '10',
      };
      const pkCentroMedico = centroMedicoMock[0].pkCentroMedico;

      const updatedCentroMedico: CentroMedico = {
        ...centroMedicoMock[0],
        potencial: '10',
      };

      jest
        .spyOn(centroMedicoRepository, 'findOneBy')
        .mockResolvedValue(centroMedicoMock[0]);
      jest
        .spyOn(centroMedicoRepository, 'save')
        .mockResolvedValue(updatedCentroMedico);

      expect(
        await service.update(pkCentroMedico, updateCentroMedicoDto),
      ).toEqual(updatedCentroMedico);
    });
    it('throw EntityNotFoundException when centro medico not found', async () => {
      const pkCentroMedico = 'incorrect-id';
      const updateCentroMedicoDto: UpdateCentroMedicoDto = {};

      jest.spyOn(centroMedicoRepository, 'findOneBy').mockResolvedValue(null);

      await expect(
        service.update(pkCentroMedico, updateCentroMedicoDto),
      ).rejects.toThrow(EntityNotFoundException);
      await expect(
        service.update(pkCentroMedico, updateCentroMedicoDto),
      ).rejects.toThrow(
        new EntityNotFoundException(CentroMedico.name, pkCentroMedico),
      );
    });
  });

  describe('delete', () => {
    it('should be defined', () => {
      expect(service.delete).toBeDefined();
    });
    it('throw EntityNotFoundException when centro médico not found', async () => {
      const pkCentroMedico = 'incorrect-id';

      jest.spyOn(centroMedicoRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.delete(pkCentroMedico)).rejects.toThrow(
        EntityNotFoundException,
      );
      await expect(service.delete(pkCentroMedico)).rejects.toThrow(
        new EntityNotFoundException(CentroMedico.name, pkCentroMedico),
      );
    });
    it('should delete a centro medico', async () => {
      const pkCentroMedico = centroMedicoMock[0].pkCentroMedico;

      jest
        .spyOn(centroMedicoRepository, 'findOneBy')
        .mockResolvedValue(centroMedicoMock[0]);
      jest
        .spyOn(centroMedicoRepository, 'remove')
        .mockResolvedValue(centroMedicoMock[0]);

      expect(await service.delete(pkCentroMedico)).toEqual(centroMedicoMock[0]);
    });
  });

  describe('countActives', () => {
    it('should be defined', () => {
      expect(service.countActives).toBeDefined();
    });
    it('should return the number of centros medicos that are active', async () => {
      jest.spyOn(centroMedicoRepository, 'count').mockResolvedValue(1);
      expect(await service.countActives()).toEqual(1);
    });
  });
});
