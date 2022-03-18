import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { configs } from "../configs";
import multer from "multer";
import { upload } from "../services/firebase";

const Multer = multer({
  storage: multer.memoryStorage(),
});

import { CreateCompanyController } from "../controllers/Company/CreateController";

const router = express.Router();

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-access-authorization"] || "";
  const myAccess = token.toString();
  await jwt.verify(myAccess, configs.secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Você não está autorizado a realizar esta operação" });
    }
    next();
  });
}

const InsertCompanyController = new CreateCompanyController();

/** -------------------- COMPANY -------------------- */
router.post("/company", InsertCompanyController.Store);
router.put("/company/:id", InsertCompanyController.CreateAuthorization);
router.put(
  "/companyThumb/:id",
  Multer.single("thumbnail"),
  upload,
  InsertCompanyController.UpdateThumbnail
);

export { router };
