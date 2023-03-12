import { Todo } from '../../entities/todo.entity';
import { CreateTodoInput } from '../dto/create-todo.input';
import { UpdateTodoInput } from '../dto/update-todo.input';
import * as typeorm from 'typeorm';

export interface TodoRepository{
  findAll():Promise<Todo[]>;
  create(CreateTodoInput):Promise<Todo>;
  findOne(id:string):Promise<Todo>;
  // update(UpdateTodoInput):Promise<Boolean>;
  remove(id:string):Promise<typeorm.DeleteResult>;
}