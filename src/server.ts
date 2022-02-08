import { ApolloServer } from 'apollo-server';
import { Prisma, PrismaClient } from '@prisma/client';

import { typeDefs } from './schema';
import { Query, Review, Book, User, Profile } from './resolvers';




export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, 
    never, 
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
}


const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Review,
        User,
        Profile,
        Book,
    },
    context: async () => {
        return {
            prisma,
        }
    }
});


server.listen().then(({ url }) => {
    console.log(`GraphQL server running on `, url);
});