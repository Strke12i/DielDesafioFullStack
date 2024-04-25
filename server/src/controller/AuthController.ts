import { compare } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';
import { config } from 'dotenv';

config();

export class AuthController{
    public async login(req: Request, res: Response) {
        try{
            const { email, password } = req.body;
            if(!email || !password){
                return res.status(400).json({ message: 'Email and password are required' });
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                },
            });

            if(!user){
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            if(await compare(password, user.password)){
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
                    expiresIn: '1d',
                });
                return res.status(200).json({ token });
            }else{
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        }catch(error){
            res.status(500).json({ message: 'Error while logging in' });
        }
    }

    public async authenticate(req: Request, res: Response, next: NextFunction){
        try {
            const token = req.headers.authorization;
            if(!token){
                return res.status(401).json({ message: 'No token provided' });
            }

            jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
                if(err){
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                return next();
            });
        }catch(error){
            return res.status(500).json({ message: 'Error while authenticating' });
        }
        
    }
}