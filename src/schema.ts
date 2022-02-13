import { gql } from 'apollo-server';


export const typeDefs = gql`
    type Query {
        books(take: Int!, skip: Int!): [Book!]!
        book(bookId: ID!): Book
        reviews(take: Int!, skip: Int!): [Review!]!
        review(reviewId: ID!): Review
        profile(userId: ID!): Profile
        me: User
        users: [User!]!
    }

    type Mutation {
        bookCreate(book: BookInput!): BookPayload!
        bookUpdate(bookId: ID!): BookPayload!
        bookDelete(bookId: ID!): BookPayload!
        bookPublish(bookId: ID!): BookPayload!
        bookUnpublish(book: ID!): BookPayload!
        reviewCreate(review: ReviewInput!): ReviewPayload!
        reviewUpdate(reviewId: ID!): ReviewPayload!
        reviewDelete(reviewId: ID!): ReviewPayload!
        profileCreate(profile: ProfileInput!): ProfilePayload!
        profileUpdate(profileId: ID!): ProfilePayload!
        profileDelete(profileId: ID!): ProfilePayload!
        signup(firstname: String!, lastname: String!, bio: String!, credentials: CredentialsInput!): AuthPayload!
        sigin(credentials: CredentialsInput!): AuthPayload!
    }

    type Book {
        id: ID!
        title: String!
        isbn: String!
        published: Boolean!
        createdAt: String!
        avgRating: Int
        author: User!
        reviews(take: Int!, skip: Int!): [Review!]!
    }

    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        email: String!
        createdAt: String!
        reviews(take: Int!, skip: Int!): [Review!]!
        profile: Profile
        books(take: Int!, skip: Int!): [Book!]!
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

    input BookInput {
        title: String
        isbn: String
    }

    input ReviewInput {
        comment: String
        rating: Int
    }

    input CredentialsInput {
        username: String
        password: String
        email: String 
    }

    input ProfileInput {
        bio: String
    }

    type UserError {
        message: String!
    }

    type BookPayload {
        userErrors: [UserError!]!
        book: Book
    }

    type ReviewPayload {
        userErrors: [UserError!]!
        review: Review
    }

    type AuthPayload {
        userErrors: [UserError!]!
        token: String
    }

    type ProfilePayload {
        userErrors: [UserError!]!
        profile: Profile
    }
    
`;