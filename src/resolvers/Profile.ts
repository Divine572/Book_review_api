import { Context } from '../server';


interface ProfileParentType {
    userId: number;
}

export const Profile = {
    user: async (parent: ProfileParentType, __: any, { prisma }: Context) => {
        return await prisma.user.findUnique({
            where: {
                id: parent.userId
            }
        });
    }
}