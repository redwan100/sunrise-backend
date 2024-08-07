import express, { NextFunction, Request, Response } from "express";
import { upload } from "../../utils/sendImageToCloudinary";
import validRequest from "../../utils/validRequest";
import { NewsController } from "./news.controller";
import { NewsValidations } from "./news.validation";

const router = express.Router();

router.post(
  "/",

  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  validRequest(NewsValidations.NewsValidationSchema),
  NewsController.createPost,
);

router.get("/", NewsController.getAllNews);
router.get("/:id", NewsController.getSingleNews);

router.patch(
  "/:newsId",
  validRequest(NewsValidations.NewsUpdatedValidationSchema),
  NewsController.updateNews,
);

router.delete("/:id", NewsController.deleteNews);

export const NewsRoute = router;
