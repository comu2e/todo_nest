import { Module, Inject } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriverConfig ,ApolloDriver} from '@nestjs/apollo';
import { GraphQLModule, Int } from '@nestjs/graphql';
import { join } from 'path';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { entities } from './typeorm-entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
  }),
TypeOrmModule.forRootAsync({
  imports:[ConfigModule],
inject:[ConfigService],
  
   useFactory: (configService: ConfigService) => {
        const host = configService.get('DB_HOST');
        const port = Number(configService.get('DB_PORT'));
        const username = configService.get('DB_USER');
        const password = configService.get('DB_PASS');
        const database = configService.get('DB_DATABASE');
        const synchronize_str = configService.get('DB_SYNCHRONIZE');
        if (
          !host ||
          !port ||
          !username ||
          !password ||
          !database ||
          !synchronize_str
        ) {
          const logger = new Logger(AppModule.name);
          const empties = [
            !host ? 'DB_HOST' : null,
            !port ? 'DB_PORT' : null,
            !username ? 'DB_USERNAME' : null,
            !password ? 'DB_PASSWORD' : null,
            !database ? 'DB_DATABASE' : null,
            !synchronize_str ? 'DB_SYNCHRONIZE' : null,
          ].filter((e) => e);
          logger.error(
            `Not Found environment-variables ${empties.join(',')} for Database`,
          );
        }
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities,
          synchronize: synchronize_str === 'true',
        };
      },
    }),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver:ApolloDriver,

    autoSchemaFile: 'schema.gql',

    sortSchema:true

  }),
  TodoModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
