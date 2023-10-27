import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user";
import { Request, Response } from "express";
import { createUserSchema } from "../utils/validator/User";

export default new class UserService {
    private readonly UserRepository: Repository<User> = 
        AppDataSource.getRepository(User);
    
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
            const { error, value } = createUserSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const user = await this.UserRepository.create({
                full_name: value.full_name,
				username: value.username,
				email: value.email,
				password: value.password,
				profile_picture: value.profile_picture,
				profile_description: value.profile_description,
            });
            const createUser = await this.UserRepository.save(user);
            return res.status(200).json(createUser);
        }   catch (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    }

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.UserRepository.find();
            return res.status(200).json(users);
        }   catch (error) {
            return res.status(500).json({ error: "Error while find users" });
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const user = await this.UserRepository.findOne({
                where: {id:id}
            });
            return res.status(200).json(user);
        }   catch (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    } 

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const data = req.body;
            const { error, value } = createUserSchema.validate(data);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const user = await this.UserRepository.findOne({
                where: {id:id},
            });
            user.full_name = value.full_name;
            user.username = value.username;
            user.email = value.email;
            user.password = value.password;
            user.profile_description = value.profile_description;
            user.profile_picture = value.profile_picture;
            const updateUser = await this.UserRepository.save(user);
            return res.status(200).json(user);
        }   catch (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const user = await this.UserRepository.findOne({
                where: {id:id},
            });
            console.log(user);
            
            const deleteUser = await this.UserRepository.delete(user);
            return res.status(200).json(deleteUser);
        }   catch (error) {
            return res.status(400).json({ error: error.details[0].message})
        }
    }
    
    
    
}