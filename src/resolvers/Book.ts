import { Context } from '../server';


interface BookParentType {
    id: number;
    authorId: number;
}


export const Book = {
    author: async (parent: BookParentType, __: any, { prisma }: Context) => {
        return await prisma.user.findUnique({
            where: {
                id: parent.authorId
            }
        })
    },
    reviews: async (parent: BookParentType, { skip, take }: { skip: number, take: number }, { prisma }: Context) => {
        return await prisma.review.findMany({
            where: {
                bookId: parent.id
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            skip,
            take
        })
    }
}