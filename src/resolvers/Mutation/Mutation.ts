import { authResolvers } from './auth';
import { bookResolvers } from './book';

export const Mutation = {
    ...bookResolvers,
    ...authResolvers
}