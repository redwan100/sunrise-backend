import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./../user/user.constant";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.userLogin);
router.post("/refresh-token", AuthController.refreshToken);
router.post(
  "/change-password",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  AuthController.changePassword,
);

router.post("/forget-password", AuthController.forgetPassword);
router.post("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
