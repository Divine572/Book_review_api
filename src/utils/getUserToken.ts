import jwt from 'jsonwebtoken';
import { JWT_SIGNATURE  } from '../keys';

export const getUserToken = async (token: string) => {
    try {
        return await jwt.verify(token, JWT_SIGNATURE) as {
            userId: number;
        };
    } catch (err) {
        return null;
    }
}