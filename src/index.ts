import { AppDataSource } from "./data-source";  
import * as express from 'express';
import ThreadRoute from "./routes/ThreadRoute";
import UserRouter from "./routes/UserRoute";
import { options } from "joi";
import * as cors from 'cors';
import ReplyRouter from "./routes/ReplyRoutes";
import LikeRouter from "./routes/LikeRoutes";
import AuthRouter from "./routes/AuthRoutes";


AppDataSource.initialize()
    .then(async () => {
        const app = express();
        const PORT = 5000;

        const options: cors.CorsOptions = {
            allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,POST,PATCH,DELETE",
            origin: "*",
            preflightContinue: false,
        };

        app.use(express.json());
        app.use(cors(options));
        app.use("/api/v1", ThreadRoute);
        app.use("/api/v1", UserRouter);
        app.use("/api/v1", ReplyRouter);
        app.use("/api/v1", LikeRouter);
        app.use("/api/v1", AuthRouter);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    })
    .catch(error => console.log(error))