import { Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { RecentController } from "./recentEvent.controller";

const router = Router();

router.post(
  "/",

  upload.array("image"),
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RecentController.createRecentEvent,
);

router.get("/", RecentController.getAllRecentEvent);
router.delete("/:id", RecentController.deleteRecentEvent);

export const RecentEvent = router;
