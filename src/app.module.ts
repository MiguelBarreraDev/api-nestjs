import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CentroMedicoModule } from './centro-medico/centro-medico.module';
import { DATABASE_CONFIG } from './config/constants';
import { databaseConfig } from './config/database.config';
import { DepartamentoModule } from './departamento/departamento.module';
import { DistritoModule } from './distrito/distrito.module';
import { GroupsModule } from './groups/groups.module';
import { HitosContactoModule } from './hitos-contacto/hitos-contacto.module';
import { HitoModule } from './hitos/hito.module';
import { MedicoHitosModule } from './medico-hitos/medico-hitos.module';
import { MedicoModule } from './medico/medico.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { HttpLoggerMiddleware } from './shared/middlewares';
import { TareasCategoriasModule } from './tareas-categorias/tareas-categorias.module';
import { TareasModule } from './tareas/tareas.module';
import { TipoContactoModule } from './tipo-contacto/tipo-contacto.module';
import { UsersModule } from './users/users.module';
import { VisitaMedicaModule } from './visita-medica/visita-medica.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(DATABASE_CONFIG),
    }),
    UsersModule,
    AuthModule,
    DepartamentoModule,
    VisitaMedicaModule,
    CentroMedicoModule,
    MedicoHitosModule,
    HitosContactoModule,
    HitoModule,
    TareasCategoriasModule,
    TareasModule,
    TipoContactoModule,
    MedicoModule,
    DistritoModule,
    ProvinciaModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
