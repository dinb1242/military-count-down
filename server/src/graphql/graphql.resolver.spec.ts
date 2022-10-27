import { Test, TestingModule } from '@nestjs/testing';
import { GraphqlResolver } from './graphql.resolver';
import { GraphqlService } from './graphql.service';

describe('GraphqlResolver', () => {
  let resolver: GraphqlResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphqlResolver, GraphqlService],
    }).compile();

    resolver = module.get<GraphqlResolver>(GraphqlResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
