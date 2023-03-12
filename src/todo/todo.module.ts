import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoResolver } from './todo.resolver';
import { TodoQuery } from './todo.repository';

@Module({
  providers: [
    TodoResolver, 
    TodoService,
    {provide:'TodoRepository',
    useClass:TodoQuery}],
})
export class TodoModule {}
