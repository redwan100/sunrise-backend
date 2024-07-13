import { Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { HomeSliderController } from "./home.slider.controller";

const router = Router();

router.post(
  "/",

  upload.array("image"),
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  HomeSliderController.createSlider,
);

router.get("/", HomeSliderController.getAllSlider);
router.delete("/:id", HomeSliderController.deleteSlider);

export const HomeSlider = router;
