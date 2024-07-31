import express from "express";

import {
    login,
    getAllUsers,
    getUserDetails,
    register,
    logout
} from '../controllers/user.js';
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.post('/new', register);

router.get("/login", login);

router.get("/logout",isAuthenticated, logout);

router.get("/me", isAuthenticated, getUserDetails);

export default router; 