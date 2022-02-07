import { Context } from '../server';


interface ReviewParentType {
    userId: number;
    bookId: number;
}


export const Review = {
    user: async (parent: ReviewParentType, __: any, { prisma }: Context) => {
        return await prisma.user.findUnique({
            where: {
                id: parent.userId
            }
        });
    },
    book: async (parent: ReviewParentType, __: any, { prisma }: Context) => {
        return await prisma.book.findUnique({
            where: {
                id: parent.bookId
            }
        })
    }
}