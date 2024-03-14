import express from "express";
import { NewsRouter } from "../modules/news/news.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/news",
    route: NewsRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
