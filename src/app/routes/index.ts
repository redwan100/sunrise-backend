import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { AdminRoute } from "../modules/admin/admin.routes";
import { HomeSlider } from "../modules/homeSlider/home.slider.routes";
import { NewsRoute } from "../modules/news/news.route";
import { PeopleRoutes } from "../modules/people/people.routes";
import { ProgramRoutes } from "../modules/program/program.routes";
import { UserRoute } from "../modules/user/user.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/news",
    route: NewsRoute,
  },
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/admins",
    route: AdminRoute,
  },
  {
    path: "/peoples",
    route: PeopleRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/home-slider",
    route: HomeSlider,
  },
  {
    path: "/program",
    route: ProgramRoutes,
  },
  {
    path: "/recent-event",
    route: ProgramRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
