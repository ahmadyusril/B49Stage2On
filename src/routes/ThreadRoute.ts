import * as express from 'express'
import ThreadController from "../controllers/ThreadController";
import AuthMiddlewares from "../middlewares/JwtAuth";
import UploadFileMiddleware from '../middlewares/UploadFile';

const ThreadRoute = express.Router();

ThreadRoute.get("/threads", ThreadController.find)
ThreadRoute.post(
    "/thread", 
    AuthMiddlewares.Authentification, 
    UploadFileMiddleware.single("image"), 
    ThreadController.create)

ThreadRoute.get("/thread/:id",ThreadController.find)

ThreadRoute.patch("/thread/:id", 
AuthMiddlewares.Authentification, 
UploadFileMiddleware.single("image"),
 ThreadController.update)

ThreadRoute.delete("/thread/:id", ThreadController.delete)

export default ThreadRoute;