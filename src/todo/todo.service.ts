import { Inject, Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './domain/todo-repository';
import { Todo } from 'src/entities/todo.entity';

@Injectable()
export class TodoService {

  constructor(

  @Inject('TodoRepository')
  private readonly todoRepository:TodoRepository
  ){}

  create(createTodoInput: CreateTodoInput) {
    return this.todoRepository.create(createTodoInput)
  }

  findAll() {
      return this.todoRepository.findAll()
    }

  findOne(id: string):Promise<Todo>{
    return this.todoRepository.findOne(id)
  }


  remove(id: string) {
   return this.todoRepository.remove(id)
  }
}
