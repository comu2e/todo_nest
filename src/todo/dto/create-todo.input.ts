import { InputType, Int, Field } from '@nestjs/graphql';
/**
 * @package
 */
@InputType()
export class CreateTodoInput {

  @Field(()=>String)
  name:string
}
