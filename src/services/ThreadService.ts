import { Repository } from "typeorm";
import { Thread } from "../entities/thread";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { createThreadSchema, updateThreadSchema } from "../utils/validator/Thread";
import { v2 as cloudinary } from 'cloudinary';
import { deleteFile } from "../utils/FileHelper";
import { uploadToCloudinary } from "../utils/Cloudinary";

export default new class ThreadService {
    private readonly ThreadRepository: Repository<Thread> = AppDataSource.getRepository(Thread)

    async create(req: Request, res: Response): Promise<Response> {
        try {
            // const image = res.locals.filename;
            // const data = {
            //     content: req.body.content,
            //     image: image,
            // }
            const data = req.body;

            const loginSession = res.locals.loginSession;

            const { error } = createThreadSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            console.log(data);
            let image = ""
            if (req.file?.filename) {
                // save to cloudinary
                image = await uploadToCloudinary(req.file);
                // delete file from local server after save to cloudinary
                deleteFile(req.file.path);
            }

            // cloudinary.config({
            //     cloud_name: "dyzem32xh",
            //     api_key: "466155932829577",
            //     api_secret: "onY7SJxmy8f-sGqvqrgMXlbu-Ls",
            // });

            // const cloudinaryResponse = await cloudinary.uploader.upload(
            //     "src/uploads" + image, { folder: "threads" }
            // );
            // console.log("cloudinary response", cloudinaryResponse);

            // deleteFile(req.file.path);

            const thread = await this.ThreadRepository.create({
                content: data.content,
                image: image,   
                user: { id: loginSession.user.id },
            });

            const setThread = await this.ThreadRepository.save(thread)
            return res.status(201).json(thread)

        }   catch (error) {
            return res.status(500).send(error)
        }
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const threads = await this.ThreadRepository.find({
                relations: ["user"],
                select: {
                    user: {
                        id: true,
                        full_name: true,
                        email: true,
                    },
                },
            });
            return res.status(200).json(threads);
        } catch (error) {
            return res.status(500).json({ error: "Error while find threads" });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) return res.status(400).json({ error: "Invalid ID" });
            const thread = await this.ThreadRepository.findOne({
                where: {
                    id: id
                }
            })
            return res.status(200).send(thread)
        } catch (error) {
            return res.status(500).json({ error: "Error while find thread" })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const image = res.locals.filename;
            const id = Number(req.params.id);
            const thread = await this.ThreadRepository.findOne({
                where: {
                    id: id
                }
            });
            if (!thread) {
                return res.status(404).send("Thread not found");
            }

            const data = req.body;
            const { error, value } = updateThreadSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            cloudinary.config({
                cloud_name: "dyzem32xh",
                api_key: "466155932829577",
                api_secret: "onY7SJxmy8f-sGqvqrgMXlbu-Ls",
            });

            const cloudinaryResponse = await cloudinary.uploader.upload(
                `src/uploads/${image}`, { folder: "threads" }
            );
            console.log("cloudinary response", cloudinaryResponse);

            deleteFile(req.file.path);

            thread.content = value.content;
            thread.image = value.image;

            const updateThread = await this.ThreadRepository.save(thread);
            return res.status(201).send(updateThread)

        } catch (error) {
            return res.status(500).json({ error: "Error while update thread" })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id)
            const thread = await this.ThreadRepository.findOneBy({ id: id })
            if (!thread) {
                return res.status(404).send("Thread not found");
            } else {
                const deleteThread = await this.ThreadRepository.remove(thread)
                return res.status(200).send({
                    Thread: deleteThread,
                    message: "Thread deleted"
                })
            }
        } catch (error) {
            return res.status(500).json({ error: "Error while delete thread" })
        }
    }
}