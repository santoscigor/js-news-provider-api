import { Router } from "express";
import { createAuthor, updateAuthor, getAuthors, deleteAuthor } from "../controllers/author";
import admin from "../middlewares/admin";

const routes = Router();

const author = `/api/admin/authors`;
const authorById = `/api/admin/authors/:id`;

routes.get(author, admin, getAuthors);
routes.post(author, admin, createAuthor);
routes.put(authorById, admin, updateAuthor);
routes.delete(authorById, admin, deleteAuthor);

export default routes;
