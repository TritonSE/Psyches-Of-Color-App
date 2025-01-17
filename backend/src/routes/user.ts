import express from "express";
import * as UserController from "src/controllers/user";
import { requireAdmin, requireSignedIn, requireStaffOrAdmin } from "src/middleware/auth";

const router = express.Router();

router.get("/whoami", requireSignedIn, UserController.getWhoAmI);

export default router;
