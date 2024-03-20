import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/create-admin",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);
    next();
  },
  // validRequest(AdminValidationSchema.adminValidation),
  UserController.createAdmin,
);

export const UserRoute = router;
