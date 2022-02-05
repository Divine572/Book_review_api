import { ApolloServer } from 'apollo-server';
import { Prisma, PrismaClient } from '@prisma/client';

import { typeDefs } from './schema';



export const prisma = new PrismaClient();

interface Context {
    prisma: PrismaClient<Prisma.PrismaClientOptions, 
    never, 
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
}


const server = new ApolloServer({
    typeDefs,
    
});


server.listen().then(({ url }) => {
    console.log(`GraphQL server running on `, url);
})