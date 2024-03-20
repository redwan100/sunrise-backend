import express from "express";
import { AdminRoute } from "../modules/admin/admin.routes";
import { NewsRoute } from "../modules/news/news.route";
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
