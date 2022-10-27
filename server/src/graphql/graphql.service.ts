import { Injectable } from '@nestjs/common';
import { CreateGraphqlInput } from './dto/create-graphql.input';
import { UpdateGraphqlInput } from './dto/update-graphql.input';

@Injectable()
export class GraphqlService {
  create(createGraphqlInput: CreateGraphqlInput) {
    return 'This action adds a new graphql';
  }

  findAll() {
    return `This action returns all graphql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} graphql`;
  }

  update(id: number, updateGraphqlInput: UpdateGraphqlInput) {
    return `This action updates a #${id} graphql`;
  }

  remove(id: number) {
    return `This action removes a #${id} graphql`;
  }
}
