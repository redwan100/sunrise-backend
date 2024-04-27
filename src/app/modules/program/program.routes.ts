import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middleware/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import { USER_ROLE } from "../user/user.constant";
import { ProgramController } from "./program.controller";

const router = Router();

router.post(
  "/",

  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  ProgramController.createProgram,
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProgramController.getAllProgram,
);

router.get(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProgramController.getSingleProgram,
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProgramController.updateProgram,
);
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  ProgramController.deleteProgram,
);

export const ProgramRoutes = router;
