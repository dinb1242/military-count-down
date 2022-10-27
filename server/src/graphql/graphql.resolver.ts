import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GraphqlService } from './graphql.service';
import { CreateGraphqlInput } from './dto/create-graphql.input';
import { UpdateGraphqlInput } from './dto/update-graphql.input';

@Resolver('Graphql')
export class GraphqlResolver {
  constructor(private readonly graphqlService: GraphqlService) {}

  @Mutation('createGraphql')
  create(@Args('createGraphqlInput') createGraphqlInput: CreateGraphqlInput) {
    return this.graphqlService.create(createGraphqlInput);
  }

  @Query('graphql')
  findAll() {
    return this.graphqlService.findAll();
  }

  @Query('graphql')
  findOne(@Args('id') id: number) {
    return this.graphqlService.findOne(id);
  }

  @Mutation('updateGraphql')
  update(@Args('updateGraphqlInput') updateGraphqlInput: UpdateGraphqlInput) {
    return this.graphqlService.update(
      updateGraphqlInput.id,
      updateGraphqlInput,
    );
  }

  @Mutation('removeGraphql')
  remove(@Args('id') id: number) {
    return this.graphqlService.remove(id);
  }
}
