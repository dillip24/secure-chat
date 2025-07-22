import { Router } from "express";
import { verifyJWT } from "../middlewares/protect.middlewares.js";
import { createChat, getChats, getMessages } from "../controllers/chats.controllers.js";

const router = Router();

// Apply the verifyJWT middleware to all routes in this file
router.use(verifyJWT);

// Define the routes
router.route("/")
    .post(createChat)
    .get(getChats);

router.route("/:id/messages")
    .get(getMessages);

// We will add the "add members" route later if needed
// router.route("/:id/members").post(addMembersToGroup);

export default router;