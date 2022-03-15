import { Context } from '../server';

export const Query = {
    books: async (_: any, { skip, take }: { skip: number, take: number }, { prisma }: Context ) => {
        const books = await prisma.book.findMany({
            where: {
                published: true
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            skip,
            take
        });
        return books;
    },
    book: async (_: any, { bookId }: { bookId: number }, { prisma }: Context ) => {
        const book = await prisma.book.findUnique({
            where: {
                id: bookId
            }
        });
        return book;
    },
    reviews: async (_: any, { skip, take }: { skip: number, take: number }, { prisma }: Context ) => {
        const reviews = await prisma.review.findMany({
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            skip,
            take
        });
        return reviews;
    },
    review: async (_: any, { reviewId }: { reviewId: number }, { prisma }: Context ) => {
        const review = await prisma.review.findUnique({
            where: {
                id: reviewId
            }
        });
        return review;
    },
    profile: async (_: any, { userId }: { userId: number }, { prisma }: Context ) => {
        const profile = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        return profile;
    }
    
};