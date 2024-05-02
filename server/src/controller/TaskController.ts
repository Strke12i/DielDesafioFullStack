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
            const { title, description, userId, status, StartDate, EndDate } = req.body;
            
            
            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                    status,
                    userId,
                    StartDate,
                    EndDate,

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
            const { title, description, status, userId, StartDate, EndDate } = req.body;
            
            const task = await prisma.task.update({
                where: {
                    id: id,
                },
                data: {
                    title,
                    description,
                    status,
                    userId,
                    StartDate,
                    EndDate,
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

    public async assignTask(req: Request, res: Response) {
        try{
            const { taskId, userId } = req.params;
            const taskUser = await prisma.taskUsers.create({
                data: {
                    taskId,
                    userId,
                },
            });
            if(taskUser)
                res.status(201).json({ message: 'Task assigned successfully' });
            else
                throw new Error('Error while assigning task');

        }catch(error){
            res.status(500).json({ message: 'Error while assigning task', error });
        }
    }

    public async unassignTask(req: Request, res: Response) {
        try{
            const { taskId, userId } = req.params;
            await prisma.taskUsers.delete({
                where: {
                    taskId_userId: {
                        taskId,
                        userId,
                    },
                },
            });
            res.status(200).json({ message: 'Task unassigned successfully' });
        }catch(error){
            res.status(500).json({ message: 'Error while unassigning task' });
        }
    }

    public async getTaskTags(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const tags = await prisma.taskTag.findMany({
                where: {
                    taskId: id,
                },
            });
            res.status(200).json(tags);
        }catch(error){
            res.status(500).json({ message: 'Error while fetching task tags' });
        }
    }

    public async addTag(req: Request, res: Response) {
        try{
            const { taskId, tagId } = req.body;
            const taskTag = await prisma.taskTag.create({
                data: {
                    taskId,
                    tagId,
                },
            });
            if(taskTag)
                res.status(201).json({ message: 'Tag added successfully' });
            else
                throw new Error('Error while adding tag');

        }catch(error){
            res.status(500).json({ message: 'Error while adding tag', error });
        }
    }

    public async removeTag(req: Request, res: Response) {
        try{
            const { taskId, tagId } = req.body;
            await prisma.taskTag.delete({
                where: {
                    taskId_tagId: {
                        taskId,
                        tagId,
                    },
                },
            });
            res.status(200).json({ message: 'Tag removed successfully' });
        }catch(error){
            res.status(500).json({ message: 'Error while removing tag' });
        }
    }
}