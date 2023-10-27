import { Repository } from "typeorm";
import { Like } from "../entities/like";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { likeSchema } from "../utils/validator/Like";
import { number } from "joi";

export default new class LikeServices {
    private readonly LikeRepository: Repository<Like> =
        AppDataSource.getRepository(Like);
    
    async create(req: Request, res: Response) : Promise<Response> {
        try {
            const data = req.body
             
            const { error, value }  = likeSchema.validate(data)
            if (error) return res.status(400).json({ Error: error })

            const like = await this.LikeRepository.create({
                user: value.user,
                thread: value.thread,
            })

            const createdLike = await this.LikeRepository.save(like)
            return res.status(200).json({
                "message": "successfull",
                "like": createdLike
            })
        }   catch (error) {
            return res.status(500).json({ error: "error while giving like" });
        }
    }

    async find(req: Request, res: Response) : Promise<Response> {
        try {
            const likes = await this.LikeRepository.find({
                relations: ['thread', 'user'],
            });
            return res.status(200).json(likes);
        }   catch (error) {
            return res.status(500).json ({ error: "error while find likes" });
        }
    }

    async findById(req: Request, res: Response) : Promise<Response> {
        try {
            const id = Number(req.params.id);
            const like = await this.LikeRepository.findOne ({
                where: { id:id },
                relations: ["thread", "user"],
            });
            return res.status(200).json(like);
        }   catch (error) {
            return res.status(500).json({error: "error while find like" });
        }
    }

    async delete(req: Request, res: Response) : Promise<Response> {
        try {
            const id = Number(req.params.id);
            const like = await this.LikeRepository.findOne({
                where: { id:id },
            });
            if (!like) {
                return res.status(404).json({error: "Like not found"});
            }
            const deleteLike = await this.LikeRepository.remove(like);
            return res.status(200).json(deleteLike);
        }   catch (error) {
            return res.status(500).json({error: "error while delete like" });
        }
    }
}