import { Context } from '../../server';
import validator from 'validator';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SIGNATURE } from '../../keys';

interface SignupArgs {
    firstname: string;
    lastname: string;
    bio: string;
    credentials: {
        username: string;
        password: string;
        email: string;
    }
}

interface SigninArgs {
    credentials: {
        username: string;
        password: string;
        email: string;
    }
}

interface AuthPayloadType {
    userErrors: {
        message: string;
    }[],
    token: string | null;
}


export const authResolvers = {
    signup: async (_: any, { firstname, lastname, bio,  credentials }: SignupArgs, { prisma }: Context): Promise<AuthPayloadType>=> {
        const { username, password, email } = credentials;

        const usernameExists = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (usernameExists) {
            return {
                userErrors: [
                    {
                        message: 'Username already exists please try again'
                    }
                ],
                token: null
            }
        }

        const emailExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (emailExists) {
            return {
                userErrors: [
                    {
                        message: 'Email already exists please try again'
                    }
                ],
                token: null
            }
        }

        
        const isEmail = validator.isEmail(email);
        if (!isEmail) {
            return {
                userErrors: [
                    {
                        message: 'Invalid Email'
                    }
                ],
                token: null
            }
        } 

        const isValidPassword = validator.isLength(password, {
            min: 5
        });

        if (!isValidPassword) {
            return {
                userErrors: [
                    {
                        message: 'Password should be not be less than 5 characters'
                    }
                ],
                token: null
            }
        }

        if (!firstname || !lastname || !bio) {
            return {
                userErrors: [
                    {
                        message: 'Invalid name or bio'
                    }
                ],
                token: null
            }
        }

        if (!username) {
            return {
                userErrors: [
                    {
                        message: 'Invalid username'
                    }
                ],
                token: null
            }
        }

        const hashedPassword = await bycrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                firstname,
                lastname,
                username,
                email,
                password: hashedPassword
            }
        });

        await prisma.profile.create({
            data: {
                bio,
                userId: user.id
            }
        });

        const token = await jwt.sign(
            { userId: user.id },
            JWT_SIGNATURE, {
                expiresIn: '1hr'
            }  
        );

        return {
            userErrors: [],
            token
        }
    },
    signin: async (_: any, { credentials }: SigninArgs, { prisma }: Context) => {

    }
}