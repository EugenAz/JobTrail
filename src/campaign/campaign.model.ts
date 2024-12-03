import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Campaign {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  dateStart: Date;

  @Field({ nullable: true })
  dateEnd?: Date;
}
