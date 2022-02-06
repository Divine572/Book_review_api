import { gql } from 'apollo-server';


export const typeDefs = gql`
    type Query {
        books(take: Int!, skip: Int!): [Book!]!
        book(bookId: ID!): Book!
    }

    type Book {
        id: ID!
        title: String!
        isbn: String!
        published: Boolean!
        createdAt: String!
        avgRating: Int
    }

    type User {
        id: ID!
    }

    

`;