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
    }
    
};