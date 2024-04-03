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
router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  adminController.getSingleAdmin,
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  adminController.updateAdmin,
);
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  adminController.deleteAdmin,
);

export const AdminRoute = router;
