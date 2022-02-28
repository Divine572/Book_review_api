import { Review, Prisma } from '@prisma/client'
import { Context } from '../../server';



interface ReviewArgs {
    review: {
        comment?: string;
        rating?: number;
    }
}

interface ReviewPayloadType {
    userErrors: {
        message:string;
    }[],
    review: Review | Prisma.Prisma__ReviewClient<Review> | null;
}


export const reviewResolvers = {
    // reviewCreate: async (_: any , { review }: ReviewArgs, { prisma, userInfo }: Context): Promise<ReviewPayloadType> => {

    //     if (!userInfo) {
    //         return {
    //             userErrors: [
    //                 {
    //                     message: 'Forbidden access (User unauthenticated)'
    //                 }
    //             ],
    //             review: null
    //         }
    //     }

    //     const { comment, rating } = review;

    //     if (!comment || !rating) {
    //         return {
    //             userErrors: [
    //                 {
    //                     message: 'Please provide a comment and rating to create a review'
                        
    //                 }
    //             ],
    //             review: null
    //         }
    //     }

    //     const book = await prisma.book.findUnique({
    //         where: {
                
    //         }
    //     })

    //     return {
    //         userErrors: [],
    //         review: await prisma.review.create({
    //             data: {
    //                 comment,
    //                 rating,
    //                 userId: userInfo.userId,
    //                 bookId
    //             }
    //         })
    //     }

    // }
}