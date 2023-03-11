import Express from "express";
import controller from "../controllers/comments.js";
const router = Express.Router();

router.get("/", controller.getComments);
router.post("/", controller.addComment);

export default router;