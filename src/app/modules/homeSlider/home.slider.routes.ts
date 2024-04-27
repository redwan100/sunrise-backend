import { Router } from "express";
import auth from "../../middleware/auth";
import { upload } from "../../utils/sendImageToCloudinary";
import { USER_ROLE } from "../user/user.constant";
import { HomeSliderController } from "./home.slider.controller";

const router = Router();

router.post(
  "/",

  upload.array("file"),
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  HomeSliderController.createSlider,
);

export const HomeSlider = router;
