
import { Injectable } from '@nestjs/common';
import { TodoRepository } from './domain/todo-repository';
import { Todo } from 'src/entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as typeorm from 'typeorm';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoQuery implements TodoRepository {
  constructor(private dataSource:typeorm.DataSource){}

 async findAll(): Promise<Todo[]> {
      const todos = await this.dataSource.getRepository(Todo).find()
      return todos
  }

  async findOne(id:string):Promise<Todo>{
    const todo = await this.dataSource.getRepository(Todo).findOne({where:{id:id}})
    return todo
  }

  async create(createTodo:CreateTodoInput): Promise<Todo> {
      const todo = await this.dataSource.getRepository(Todo).create({...createTodo})
      return this.dataSource.getRepository(Todo).save(todo)
  }

  // async update(updateTodo:UpdateTodoInput):Promise<Todo>{
  //   const todo = this.dataSource.getRepository(Todo).update({...updateTodo})
  // }

  async remove(id:string):Promise<typeorm.DeleteResult>{
    const todo = await this.dataSource.getRepository(Todo).findOne({where:{id:id}})

    return await this.dataSource.getRepository(Todo).delete(todo)
 
  }

}