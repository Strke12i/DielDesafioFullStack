import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export class TaskController {
    public async getTasks(req: Request, res: Response) {
        try{
            const tasks = await prisma.task.findMany();
            res.status(200).json(tasks);
        }catch(error){
            res.status(500).json({ message: 'Error while fetching tasks' });
        }
    }

    public async getTask(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const task = await prisma.task.findUnique({
                where: {
                    id: id,
                },
            });
            res.status(200).json(task);
        }catch(error){
            res.status(500).json({ message: 'Error while fetching task' });
        }
    }

    public async createTask(req: Request, res: Response) {
        try{
            const { title, description, userId, status } = req.body;
            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                    status,
                    userId,
                },
            });
            if(task)
                res.status(201).json({ message: 'Task created successfully' });
            else
                throw new Error('Error while creating task');

        }catch(error){
            res.status(500).json({ message: 'Error while creating task', error });
        }
    }

    public async updateTask(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const { title, description, status, userId } = req.body;
            const task = await prisma.task.update({
                where: {
                    id: id,
                },
                data: {
                    title,
                    description,
                    status,
                    userId,
                },
            });
            res.status(200).json({ message: 'Task updated successfully' });
        }catch(error){
            res.status(500).json({ message: 'Error while updating task' });
        }
    }

    public async deleteTask(req: Request, res: Response) {
        try{
            const { id } = req.params;
            await prisma.task.delete({
                where: {
                    id: id,
                },
            });
            res.status(200).json({ message: 'Task deleted successfully' });
        }catch(error){
            res.status(500).json({ message: 'Error while deleting task' });
        }
    }

    public async getTaskUsers(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const users = await prisma.taskUsers.findMany({
                where: {
                    taskId: id,
                },
            });
            res.status(200).json(users);
        }catch(error){
            res.status(500).json({ message: 'Error while fetching user tasks' });
        }
    }
}