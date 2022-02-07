import { Context } from '../server';


interface BookParentType {
    authorId: number
}

interface ReviewsParentType {
    id: number
}


export const Book = {
    author: async (parent: BookParentType, __: any, { prisma }: Context) => {
        return await prisma.user.findUnique({
            where: {
                id: parent.authorId
            }
        })
    },
    reviews: async (parent: ReviewsParentType, { skip, take }: { skip: number, take: number }, { prisma }: Context) => {
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