import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import { PeopleController } from "./people.controller";

const router = Router();

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  PeopleController.getAllPeople,
);
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  PeopleController.getSinglePeople,
);
router.patch(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  PeopleController.updatePeople,
);
router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.user),
  PeopleController.deletePeople,
);

export const PeopleRoutes = router;
