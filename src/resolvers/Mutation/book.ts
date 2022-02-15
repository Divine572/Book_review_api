import { Book, Prisma } from "@prisma/client";
import { Context } from '../../server';


interface BookArgs {
    book: {
        title?: string;
        isbn?: string;
    }
}

interface BookPayloadType {
    userErrors: {
        message: string;
    }[],
    book: Book | Prisma.Prisma__BookClient<Book> | null;
}


export const bookResolvers = {
    bookCreate: async (_: any , { book }: BookArgs, { prisma, userInfo }: Context): Promise<BookPayloadType> => {
        
        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: 'Forbidden access (User unauthenticated)'
                    }
                ],
                book: null
            }
        }

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
                    authorId: userInfo.userId
                }
            })
        }
    },
    bookUpdate: async (_: any, { bookId, book }: { bookId: string, book: BookArgs['book'] }, { prisma, userInfo }: Context ): Promise<BookPayloadType> => {


        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: 'Forbidden access (User unauthenticated)'
                    }
                ],
                book: null
            }
        }

        const { title, isbn } = book;

        if (!title && !isbn) {
            return {
                userErrors: [
                    {
                        message: 'Please provide at least a field to update a book'
                        
                    }
                ],
                book: null
            }
        }

        const existingBook = await prisma.book.findUnique({
            where: {
                id: Number(bookId)
            }
        });

        if (!existingBook) {
            return {
                userErrors: [
                    {
                        message: 'Book does not exist'
                        
                    }
                ],
                book: null
            }
        };

        let payloadToUpdate = {
            title,
            isbn
        }

        if (!title) delete payloadToUpdate.title;
        if (!isbn) delete payloadToUpdate.isbn;
        
        return {
            userErrors: [],
            book: await prisma.book.update({
                data: {
                    ...payloadToUpdate
                },
                where: {
                    id: Number(bookId)
                }
            })
        }
    },
    bookDelete: async (_: any, { bookId } : { bookId: string }, { prisma, userInfo }: Context  ): Promise<BookPayloadType> => {

        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: 'Forbidden access (User unauthenticated)'
                    }
                ],
                book: null
            }
        }

        const existingBook = await prisma.book.findUnique({
            where: {
                id: Number(bookId)
            }
        });

        if (!existingBook) {
            return {
                userErrors: [
                    {
                        message: 'Book does not exist'
                        
                    }
                ],
                book: null
            }
        };

        await prisma.book.delete({
            where: {
                id: Number(bookId)
            }
        });

        return {
            userErrors: [],
            book: existingBook
        }
    },
    bookPublish: async (_: any, { bookId } : { bookId: string }, { prisma, userInfo }: Context  ): Promise<BookPayloadType> => {

        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: 'Forbidden access (User unauthenticated)'
                    }
                ],
                book: null
            }
        }

        return {
            userErrors: [],
            book: await prisma.book.update({
                data: {
                    published: true
                },
                where: {
                    id: Number(bookId)
                }
            })
        }
    },
    bookUnpublish: async (_: any, { bookId } : { bookId: string }, { prisma, userInfo }: Context  ): Promise<BookPayloadType> => {

        if (!userInfo) {
            return {
                userErrors: [
                    {
                        message: 'Forbidden access (User unauthenticated)'
                    }
                ],
                book: null
            }
        }

        return {
            userErrors: [],
            book: await prisma.book.update({
                data: {
                    published: false
                },
                where: {
                    id: Number(bookId)
                }
            })
        }
    }
}