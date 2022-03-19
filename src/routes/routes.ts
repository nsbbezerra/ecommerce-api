import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { configs } from "../configs";
import multer from "multer";
import { upload } from "../services/firebase";

const Multer = multer({
  storage: multer.memoryStorage(),
});

import { CreateCompanyController } from "../controllers/Company/CreateController";
import { UpdateCompanyController } from "../controllers/Company/UpdateController";
import { EmployeeController } from "../controllers/Employees/EmployeeController";

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
const AlterCompanyController = new UpdateCompanyController();
const EmployeesController = new EmployeeController();

/** -------------------- COMPANY -------------------- */
router.post("/company", InsertCompanyController.Store);
router.put("/company/:id", InsertCompanyController.CreateAuthorization);
router.put(
  "/companyThumb/:id",
  Multer.single("thumbnail"),
  upload,
  InsertCompanyController.UpdateThumbnail
);
router.put("/updateCompanyInfo/:id", AlterCompanyController.UpdateInfo);
router.put(
  "/changeCompanyExpiresCode/:id",
  AlterCompanyController.UpdateExpiresDate
);
router.put("/activeCompany/:id", AlterCompanyController.ActiveCompany);
router.get("/findCompanyById/:id", InsertCompanyController.FindCompanyById);
router.get("/findCompanies", InsertCompanyController.FindCompany);

/** ------------------- EMPLOYEES ------------------- */
router.post("/employees", verifyToken, EmployeesController.Store);
router.post("/employeeNotAuth", EmployeesController.Store);
router.get("/findEmployees/:company_id", verifyToken, EmployeesController.Find);
router.put(
  "/changeEmployeePermission/:id",
  verifyToken,
  EmployeesController.ChangePermission
);
router.put("/activeEmployee/:id", verifyToken, EmployeesController.Active);
router.post("/login/:company_id", EmployeesController.Login);

export { router };
