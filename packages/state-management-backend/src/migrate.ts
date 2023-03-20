import { MikroORM } from '@mikro-orm/core';
import { User } from './app/users/entities/user.entity';
import { Review } from './app/products/entities/review.entity';

(async () => {
  const orm = await MikroORM.init({
    type: 'postgresql',
    clientUrl: 'postgres://postgres:postgrespw@localhost:32768/state-db',
    entities: [User, Review],
    debug: true,
  });

  const migrator = orm.getMigrator();
  await migrator.createMigration(); // creates file Migration20191019195930.ts
  await migrator.up(); // runs migrations up to the latest
  await orm.close(true);
})();
