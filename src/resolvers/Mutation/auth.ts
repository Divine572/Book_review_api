import { Context } from '../../server';
import validator from 'validator';

interface SignupArgs {
    firstname: string;
    lastname: string;
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
    signup: async (_: any, { firstname, lastname, credentials }: SignupArgs, { prisma }: Context): Promise<AuthPayloadType>=> {
        const { username, password, email } = credentials;
        
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

        
    },
    signin: async (_: any, { credentials }: SigninArgs, { prisma }: Context) => {

    }
}