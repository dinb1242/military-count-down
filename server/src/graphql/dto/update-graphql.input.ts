import { CreateGraphqlInput } from './create-graphql.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGraphqlInput extends PartialType(CreateGraphqlInput) {
  id: number;
}
