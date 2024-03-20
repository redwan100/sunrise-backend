import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import validRequest from "../../utils/validRequest";
import { adminController } from "./admin.controller";
import { AdminValidationSchema } from "./admin.validation";

const router = Router();

router.post(
  "/create-admin",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);
    next();
  },
  validRequest(AdminValidationSchema.adminValidation),
  adminController.createAdmin,
);
router.get("/", adminController.getAllAdmin);
router.get("/:id", adminController.getSingleAdmin);
router.patch("/:id", adminController.updateAdmin);
router.delete("/:id", adminController.deleteAdmin);

export const AdminRoute = router;
