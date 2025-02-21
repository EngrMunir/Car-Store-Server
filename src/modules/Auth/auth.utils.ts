
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: {userEmail: string; role:string},
    secret: Secret,
    expiresIn:string
) =>{
    return jwt.sign(jwtPayload, secret, { expiresIn:'1hr'})
};

export const verifyToken = (token: string, secret:Secret) =>{
    return jwt.verify(token, secret) as JwtPayload;
};