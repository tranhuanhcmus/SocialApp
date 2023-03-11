import Express from "express";
import controller from "../controllers/relationships.js";
const router = Express.Router();

router.get("/", controller.getRelationships);
router.post("/", controller.addRelationship);
router.delete("/", controller.deleteRelationship);

export default router;