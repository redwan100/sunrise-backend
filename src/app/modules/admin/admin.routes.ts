import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import validRequest from "../../utils/validRequest";
import { adminController } from "./admin.controller";
import { AdminValidationSchema } from "./admin.validation";

const router = Router();


router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getSingleAdmin);
router.patch("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

export const AdminRoute = router;
