import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';

import { typeDefs } from './schema';




const prisma = new PrismaClient();


const server = new ApolloServer({
    typeDefs,
    
});


server.listen(({ url }) => {
    console.log(`GraphQL server running on `, url);
})