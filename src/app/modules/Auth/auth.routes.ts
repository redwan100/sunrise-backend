import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.userLogin);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/change-password", AuthController.changePassword);

export const AuthRoutes = router;
