import express from 'express'
import { login } from '../Controllers/auth.js';

const routes=express.Router();

routes.get('/login',login);

export default routes;