import Express from "express";
import controller from "../controllers/likes.js";
const router = Express.Router();

router.get("/", controller.getLikes);
router.post("/", controller.addLike);
router.delete("/", controller.deleteLike);

export default router;