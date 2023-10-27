import { Router } from "express";
import LikeControllers from "../controllers/LikeControllers";

const LikeRouter = Router();
LikeRouter.get("/likes", LikeControllers.find)
LikeRouter.post("/like", LikeControllers.create)
LikeRouter.get("/like/:id", LikeControllers.findById)
LikeRouter.delete("/like/:id", LikeControllers.delete)

export default LikeRouter;