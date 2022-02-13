import { ApolloServer } from 'apollo-server';
import { Prisma, PrismaClient } from '@prisma/client';

import { typeDefs } from './schema';
import { Query, Review, Book, User, Profile, Mutation } from './resolvers';
import { getUserToken } from './utils/getUserToken';




export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, 
    never, 
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
    userInfo: {
        userId: number;
    } | null;
}


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Review,
        User,
        Profile,
        Book,
        Mutation
    },
    context: async ({ req }: any ): Promise<Context> => {
        const token = req.headers.authorization;
        const userInfo = await getUserToken(token);
        return {
            prisma,
            userInfo
        }
    }
});


server.listen().then(({ url }) => {
    console.log(`GraphQL server running on `, url);
});