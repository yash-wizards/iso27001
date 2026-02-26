import { Router } from "express";
import upload  from "../middlewares/multer.middleware.js";
import fileControllers from "../controllers/file.controller.js"
const fileRouter = Router();

fileRouter.post("/upload", upload.single("pdf"), fileControllers.pdfUpload);

export default fileRouter;
