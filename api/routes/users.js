import Express from "express";
import controller from "../controllers/users.js";
const router = Express.Router();

router.get("/all", controller.getUsers);
router.get("/find/:userId", controller.getUser);

export default router;