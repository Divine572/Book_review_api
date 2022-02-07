import { Context } from '../server';


interface UserParentType {
    id: number;
}

export const User = {
    reviews: async (parent: UserParentType, { skip, take }: { skip: number, take: number }, { prisma }: Context) => {
        return await prisma.review.findMany({
            where: {
                userId: parent.id
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            skip,
            take
        })
    },
    profile: async (parent: UserParentType, __ : any, { prisma }: Context) => {
        return await prisma.profile.findUnique({
            where: {
                userId: parent.id
            }
        })
    },
    books: async (parent: UserParentType, { skip, take} : { skip: number, take: number }, { prisma }: Context) => {
        return await prisma.book.findMany({
            where: {
                authorId: parent.id, 
            }
        })
    }
}