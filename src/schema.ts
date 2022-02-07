import { gql } from 'apollo-server';


export const typeDefs = gql`
    type Query {
        books(take: Int!, skip: Int!): [Book!]!
        book(bookId: ID!): Book
        reviews: [Review!]!
        review(reviewId: ID!): Review
        profile(userId: ID!): Profile
        me: User
        users: [User!]!
    }

    type Book {
        id: ID!
        title: String!
        isbn: String!
        published: Boolean!
        createdAt: String!
        avgRating: Int
        author: User!
        reviews: [Review!]!
    }

    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        password: String!
        email: String!
        createdAt: String!
        reviews: [Review!]!
        profile: Profile
        books: [Book!]!
    }

    type Profile {
        id: ID!
        bio: String!
        user: User!
    }

    type Review {
        id: ID!
        comment: String!
        rating: Int!
        createdAt: String!
        user: User!
        book: Book!
    }
    
`;