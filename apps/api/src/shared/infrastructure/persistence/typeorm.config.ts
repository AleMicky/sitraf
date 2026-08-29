import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function typeOrmConfig(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.getOrThrow<string>('database.host'),
    port: configService.getOrThrow<number>('database.port'),
    username: configService.getOrThrow<string>('database.username'),
    password: configService.getOrThrow<string>('database.password'),
    database: configService.getOrThrow<string>('database.database'),
    autoLoadEntities: true,
    synchronize: configService.get<boolean>('database.synchronize') ?? false,
    logging: configService.get<boolean>('database.logging') ?? false,
  };
}
