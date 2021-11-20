import { Router } from "express";
import {
    getArticles,
    getArticleDetail,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticle
} from "../controllers/article";
import admin from "../middlewares/admin";
import auth from "../middlewares/auth";

const routes = Router();

const articles = "/api/articles";
const articleDetail = "/api/articles/:id";
const article = "/api/admin/articles";
const articleById = "/api/admin/articles/:id";

routes.get(articles, getArticles);
routes.get(articleDetail, auth, getArticleDetail);

routes.get(article, admin, getArticle);
routes.post(article, admin, createArticle);
routes.put(articleById, admin, updateArticle);
routes.delete(articleById, admin, deleteArticle);

export default routes;
