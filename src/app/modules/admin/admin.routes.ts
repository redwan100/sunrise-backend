import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./../user/user.constant";
import { adminController } from "./admin.controller";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  adminController.getAllAdmin,
);
router.get("/:id", adminController.getSingleAdmin);
router.patch("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

export const AdminRoute = router;
