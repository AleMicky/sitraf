import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './shared/infrastructure/config/app.config';
import databaseConfig from './shared/infrastructure/config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './shared/infrastructure/persistence/typeorm.config';
import { AgenciasModule } from './modules/agencias/agencias.module';
import { RutasModule } from './modules/rutas/rutas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['../../.env.local', '../../.env'],
      load: [appConfig, databaseConfig],
    }),
    AgenciasModule,
    RutasModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
  ],
})
export class AppModule {}
