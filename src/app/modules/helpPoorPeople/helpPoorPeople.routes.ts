import { Router } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import { HelpPoorPeopleController } from "./helpPoorPeople.controller";

const router = Router();

router.post(
  "/",

  upload.array("image"),
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  HelpPoorPeopleController.createHelpPoorPeople,
);

router.get("/", HelpPoorPeopleController.getHelpPoorPeople);
router.delete("/:id", HelpPoorPeopleController.deleteHelpPoorPeople);

export const HelpPoorPeople = router;
