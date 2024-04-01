import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import validRequest from "../../utils/validRequest";
import { AdminValidationSchema } from "../admin/admin.validation";
import { PeopleValidationSchema } from "../people/people.validation";
import { UserController } from "./user.controller";

const router = Router();

router.post(
  "/create-admin",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);
    next();
  },
  validRequest(AdminValidationSchema.adminValidation),
  UserController.createAdmin,
);

router.post(
  "/create-people",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);
    next();
  },
  validRequest(PeopleValidationSchema.peopleValidation),
  UserController.createPeople,
);

export const UserRoute = router;
