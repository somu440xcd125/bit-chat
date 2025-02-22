import expres from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import {getUsersForSideBar,getMessage,sendMessage} from "../controllers/message.controller.js"
const router=expres.Router()

router.get("/users",protectRoute,getUsersForSideBar)
router.get("/:id",protectRoute,getMessage)
router.post("/send/:id",protectRoute,sendMessage)

export default router;