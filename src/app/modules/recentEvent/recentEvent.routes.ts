import { Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { RecentEventService } from "./recentEvent.service";

const router = Router();

router.post(
  "/",

  upload.array("image"),
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  RecentEventService.createRecentEvent,
);

router.get("/", RecentEventService.getALLRecentEvent);
router.delete("/:id", RecentEventService.deleteRecentEvent);

export const RecentEvent = router;
