import { Router } from "express";
import routesAuth from "./routes/auth";
import routesArticle from "./routes/article";
import routesAuthor from "./routes/author";

const routes = Router();

routes.use(routesAuth);
routes.use(routesArticle);
routes.use(routesAuthor);

export default routes;
