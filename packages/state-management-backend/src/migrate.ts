import { MikroORM } from '@mikro-orm/core';
import { User } from './app/users/entities/user.entity';

(async () => {
  const orm = await MikroORM.init({
    type: 'postgresql',
    clientUrl: 'postgres://postgres:123456@localhost:5432/state_db',
    entities: [User],
    debug: true,
  });

  const migrator = orm.getMigrator();
  await migrator.createMigration(); // creates file Migration20191019195930.ts
  await migrator.up(); // runs migrations up to the latest
  await orm.close(true);
})();
