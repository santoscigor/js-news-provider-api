import { Router } from "express";
import {
  login,
  signUp,
} from "../controllers/auth";

const routes = Router();

export const loginRoute = `/api/login`;
export const signupRoute = `/api/sign-up`;
export const author = `/api/admin/authors`;

routes.post(loginRoute, login);
routes.post(signupRoute, signUp);

export default routes;
