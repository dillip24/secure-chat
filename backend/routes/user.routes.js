

import { Router } from "express";

import {verifyJWT} from "../middlewares/protect.middlewares.js";

import { getAllUsers, getUserProfile  } from "../controllers/user.controllers.js";


const router = Router();



router.get('/profile',verifyJWT, getUserProfile);
router.get('/all', verifyJWT, getAllUsers);


export default router;
