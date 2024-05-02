import { Request, Response } from 'express';
import prisma from '../lib/prisma';


export class TagController{
    public async getTags(req: Request, res: Response){
        try{
            const tags = await prisma.tag.findMany();
            res.status(200).json(tags);
        }catch(error){
            res.status(500).json({ message: 'Error while fetching tags' });
        }
    }

    public async getTag(req: Request, res: Response){
        try{
            const { id } = req.params;
            const tag = await prisma.tag.findUnique({
                where: {
                    id: id,
                },
            });
            res.status(200).json(tag);
        }catch(error){
            res.status(500).json({ message: 'Error while fetching tag' });
        }
    }

    public async createTag(req: Request, res: Response){
        try{
            const { name } = req.body;
            const tag = await prisma.tag.create({
                data: {
                    name,
                },
            });
            if(tag)
                res.status(201).json({ message: 'Tag created successfully' });
            else
                throw new Error('Error while creating tag');

        }catch(error){
            res.status(500).json({ message: 'Error while creating tag', error });
        }
    }

    public async updateTag(req: Request, res: Response){
        try{
            const { id } = req.params;
            const { name } = req.body;
            const tag = await prisma.tag.update({
                where: {
                    id: id,
                },
                data: {
                    name,
                },
                select: {
                    name: true,
                }
            });
            if(tag)
                res.status(200).json({ message: 'Tag updated successfully' });
            else
                throw new Error('Error while updating tag');

        }catch(error){
            res.status(500).json({ message: 'Error while updating tag', error });
        }
    }

    public async deleteTag(req: Request, res: Response){
        try{
            const { id } = req.params;
            const tag = await prisma.tag.delete({
                where: {
                    id: id,
                },
            });
            if(tag)
                res.status(200).json({ message: 'Tag deleted successfully' });
            else
                throw new Error('Error while deleting tag');

        }catch(error){
            res.status(500).json({ message: 'Error while deleting tag', error });
        }
    }
}