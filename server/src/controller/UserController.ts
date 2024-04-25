import { NextFunction, Request, Response } from 'express';
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

export class UserController {
    public async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error while fetching users' });
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user: User = await prisma.user.findFirstOrThrow({
                where: {
                    id: id,
                },
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error while fetching user' });
        }
    }

    public async createUser(req: Request, res: Response) {
        try {
            let { email, name, password } = req.body;
            if (!email || !name || !password) {
                throw new Error('Email, name and password are required fields');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }

            password = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password,
                },
            });

            if (user) {
                res.status(201).json({ message: 'User created successfully' });
            }else{
                throw new Error('Error while creating user');
            }
        }catch (error) {
            res.status(500).json({ message: error});
        }
        
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            let { email, name, password } = req.body;

            if (!email || !name || !password) {
                throw new Error('Email, name and password are required fields');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
            }

            password = await bcrypt.hash(password, 10);
            const user = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    email,
                    name,
                    password,
                },
            });
            res.status(200).json({ message: 'User updated successfully' });
        }catch (error) {
            res.status(500).json({ message: 'Error while updating user' });
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await prisma.user.delete({
                where: {
                    id: id,
                },
            });
            res.status(200).json({ message: 'User deleted successfully' });
        }catch (error) {
            res.status(500).json({ message: 'Error while deleting user' });
        }
    }

    public async getUserTasks(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const tasks = await prisma.task.findMany({
                where: {
                    userId: id,
                },
            });
            res.status(200).json(tasks);
        }catch (error) {
            res.status(500).json({ message: 'Error while fetching user tasks' });
        }
    }

}