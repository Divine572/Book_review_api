import { Book, Prisma } from "@prisma/client";
import { Context } from '../../server';


interface BookArgs {
    book: {
        title: string;
        isbn: string;
    }
}

interface BookPayloadType {
    userErrors: {
        message: string;
    }[],
    book: Book | Prisma.Prisma__BookClient<Book> | null;
}


export const bookResolvers = {
    bookCreate: async (_: any , { book }: BookArgs, { prisma }: Context): Promise<BookPayloadType> => {
        
        const { title, isbn } = book;

        if (!title || !isbn) {
            return {
                userErrors: [
                    {
                        message: 'Please provide a title and isbn number to create a book'
                        
                    }
                ],
                book: null
            }
        }

        return {
            userErrors: [],
            book: await prisma.book.create({
                data: {
                    title,
                    isbn,
                    authorId: 1
                }
            })
        }

    }
}