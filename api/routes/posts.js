import Express from "express";
import controller from "../controllers/posts.js";
const router = Express.Router();

router.get("/", controller.getPosts);
router.post("/", controller.addPost);

export default router;