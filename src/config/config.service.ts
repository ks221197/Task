import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ConfigService {
  get typeOrmConfig(): TypeOrmModuleOptions {
    const migrations = [__dirname + '/../migrations/*{.ts,.js}'];
    const entities = [__dirname + '/../**/*.entity{.ts,.js}'];

    console.log(entities);

    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'sqlite',
      synchronize: false,
      migrationsRun: true,
      logging: true,
      database: ':memory:',
    };
  }
}
