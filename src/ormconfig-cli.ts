import { ormConfig } from './ormconfig';
import { Mock } from '@/modules/mock/entities/mock.entity';

export default {
  ...ormConfig,
  entities: [Mock],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
