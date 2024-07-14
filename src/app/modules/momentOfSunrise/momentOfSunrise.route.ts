import express, { NextFunction, Request, Response } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import validRequest from "../../utils/validRequest";

import { MomentOfSunriseController } from "./momentOfSunrise.controller";
import { MomentOfSunriseValidations } from "./momentOfSunrise.validation";

const router = express.Router();

router.post(
  "/",

  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validRequest(MomentOfSunriseValidations.MomentOfSunriseValidationSchema),
  MomentOfSunriseController.createMomentOfSunrise,
);

router.get("/", MomentOfSunriseController.getAllMomentOfSunrise);

router.patch(
  "/:momentId",
  validRequest(
    MomentOfSunriseValidations.MomentOfSunriseUpdatedValidationSchema,
  ),
  MomentOfSunriseController.updateMomentOfSunrise,
);

router.delete("/:momentId", MomentOfSunriseController.deleteMomentOfSunrise);

export const MomentOfSunriseRoute = router;
