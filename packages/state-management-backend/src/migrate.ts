import { MikroORM } from '@mikro-orm/core';
import { User } from './app/users/entities/user.entity';
import { Review } from './app/reviews/entities/review.entity';
import { ConfigService } from '@nestjs/config';
import { ProductReview } from './app/reviews/entities/product-review.entity';

(async () => {
  const configService = new ConfigService();

  const orm = await MikroORM.init({
    type: 'postgresql',
    clientUrl: configService.get('DATABASE_URL'),
    entities: [User, Review,  ProductReview],
    debug: true,
  });

  const migrator = orm.getMigrator();
  await migrator.createMigration(); // creates file Migration20191019195930.ts
  await migrator.up(); // runs migrations up to the latest
  await orm.close(true);
})();
