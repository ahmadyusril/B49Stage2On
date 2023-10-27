import { Repository } from "typeorm";
import { Reply } from "../entities/reply";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { createReplySchema, updateReplySchema } from "../utils/validator/Reply";

export default new class ReplyServices {
    private readonly ReplyRepository: Repository<Reply> =
        AppDataSource.getRepository(Reply);
    
    async create(req: Request, res: Response) : Promise<Response> {
        try {
            const data = req.body;
            const { error, value } = createReplySchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            console.log(value);
            const reply = this.ReplyRepository.create({
                thread: value.thread_id,
                user: value.user_id,
                content: value.content,
                image: value.image

            });
            const createReply = await this.ReplyRepository.save(reply);
            return res.status(201).json(createReply);        
        }   catch (error) {
            return res.status(500).json({error: "error while creating reply" })
        }
    }

    async findById(req: Request, res: Response) : Promise<Response> {
        try {
            const id = Number(req.params.id);
            const reply = await this.ReplyRepository.findOne({
                where: { id:id },
                relations: ["thread", "user"],
                select: {
                    thread: { id: true, content: true },
                    user: { id: true, full_name: true, email: true },
                },
            });
            return res.status(200).json(reply);
        }   catch (error) {
            return res.status(500).json ({ error: "error while find reply" })
        }
    }
    
    async find(req: Request, res: Response): Promise<Response> {
        try {
            const replies = await this.ReplyRepository.find({
                relations: ["thread, users"],
                select: {
                    thread: {
                        id: true,
                        content: true,
                    },
                    user: {
                        id: true,
                        full_name: true,
                        email: true,
                    },
                },
            });
            return res.status(200).json(replies);
        } catch (error) {
            return res.status(500).json({ error: "error while find replies" });
        }
    }

    async update(req: Request, res: Response) : Promise<Response> {
        try {
            const id = Number(req.params.id);
            const reply = await this.ReplyRepository.findOne({
                where: { id:id },
                relations: ["thread", "user"],
            });
            if (!reply) {
                return res.status(404).send("Reply not found");
            }

            const data = req.body;
            const { error, value } = updateReplySchema.validate(data);
            if (error) {
                return res.status(400).json({error: error.details[0].message});
            }
            reply.content = value.content;
            reply.image = value.image;

            const updateReply = await this.ReplyRepository.save(reply);
            return res.status(201).send(updateReply)

        }   catch (error) {
            return res.status(500).json({ error: "Error while update thread" })
        }
    }

    async delete(req: Request, res: Response) : Promise<Response> {
        try {
            const id = Number(req.params.id);
            const reply = await this.ReplyRepository.findOne ({ 
                where: { id:id },
                relations: ["thread", "user"],
             });
            if (!reply) {
                return res.status(404).send("Thread not found");
            }   else {
                const deleteReply = await this.ReplyRepository.remove(reply);
                return res.status(200).send({
                    Thread: deleteReply,
                    message: "Thread deleted"
                });
            }
        }   catch (error) {
            return res.status(500).json({ error: "Error while delete thread" })
        }
    }   
}