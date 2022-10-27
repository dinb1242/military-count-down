import { Module } from '@nestjs/common';
import { GraphqlService } from './graphql.service';
import { GraphqlResolver } from './graphql.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    // 옵션 객체를 통해 ApolloDriver 에 적용된다.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql/graphql.ts'),
      // },
      // debug: false,
      // playground: false,
    }),
  ],
  providers: [GraphqlResolver, GraphqlService],
})
export class GraphqlModule {}
