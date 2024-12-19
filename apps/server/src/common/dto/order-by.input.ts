import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OrderByInput<T> {
  @Field(() => String, { nullable: true })
  field: keyof T;

  @Field(() => String, { nullable: true })
  direction: 'asc' | 'desc';
}
