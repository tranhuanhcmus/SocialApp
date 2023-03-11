import Express from "express";
import controller from "../controllers/auth.js";
const router = Express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

export default router;