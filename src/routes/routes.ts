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
import { RegisterClientController } from "../controllers/Clients/RegisterController";
import { UpdateClientController } from "../controllers/Clients/UpdateController";
import { CategoriesController } from "../controllers/Categories/CategoriesController";
import { SubCategoriesController } from "../controllers/SubCategories/SubCategoriesController";
import { ProductController } from "../controllers/Products/ProductsController";
import { ShippingController } from "../controllers/Shipping/ShippingController";

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
const StoreClientController = new RegisterClientController();
const AlterClientController = new UpdateClientController();
const CategoryController = new CategoriesController();
const SubCategoryController = new SubCategoriesController();
const ProductsController = new ProductController();
const ShippingControl = new ShippingController();

/** -------------------- COMPANY -------------------- */
router.post("/company", InsertCompanyController.Store);
router.put("/company/:id", InsertCompanyController.CreateAuthorization);
router.put(
  "/companyThumb/:id",
  Multer.single("thumbnail"),
  upload,
  InsertCompanyController.UpdateThumbnail
);
router.put(
  "/updateCompanyInfo/:id",
  verifyToken,
  AlterCompanyController.UpdateInfo
);
router.put("/updateCompanyInfoAuth/:id", AlterCompanyController.UpdateInfo);
router.put(
  "/changeCompanyExpiresCode/:id",
  AlterCompanyController.UpdateExpiresDate
);
router.put("/activeCompany/:id", AlterCompanyController.ActiveCompany);
router.get("/findCompanyById/:id", InsertCompanyController.FindCompanyById);
router.get("/findCompanies", InsertCompanyController.FindCompany);
router.post(
  "/findCompanyInformation/:company_id",
  InsertCompanyController.GetInformation
);

/** ------------------- EMPLOYEES ------------------- */
router.post("/employees/:company_id", verifyToken, EmployeesController.Store);
router.post("/employeeNotAuth/:company_id", EmployeesController.Store);
router.get("/findEmployees/:company_id", verifyToken, EmployeesController.Find);
router.put(
  "/changeEmployeePermission/:id",
  verifyToken,
  EmployeesController.ChangePermission
);
router.put("/activeEmployee/:id", verifyToken, EmployeesController.Active);
router.post("/login/:company_id", EmployeesController.Login);
router.put("/changeAuthInfo/:id", verifyToken, EmployeesController.UpdateAuth);

/** ------------------- CLIENTS --------------------- */
router.post("/clients/:company_id", StoreClientController.Store);
router.get("/clients", StoreClientController.Find);
router.get(
  "/findClientsByCompany/:company_id",
  verifyToken,
  StoreClientController.FindByCompany
);
router.get("/findClientsById/:id", verifyToken, StoreClientController.FindById);
router.put(
  "/updateClientInfo/:id",
  verifyToken,
  AlterClientController.UpdateInfo
);
router.put(
  "/updateClientPassword/:token",
  AlterClientController.UpdatePassword
);
router.post(
  "/requestUpdatePassword",
  AlterClientController.RequestUpdatePassword
);

/** -------------------- CATEGORIES ---------------------- */
router.post("/categories/:company_id", verifyToken, CategoryController.Store);
router.get("/categories/:company_id", CategoryController.List);
router.put("/categories/:id", verifyToken, CategoryController.Update);
router.put(
  "/updateIconCategory/:id",
  verifyToken,
  CategoryController.UpdateIcon
);
router.put("/activeCategory/:id", verifyToken, CategoryController.Active);

/** -------------------- SUB CATEGORIES ------------------ */
router.post(
  "/subCategories/:company_id/:category_id",
  verifyToken,
  SubCategoryController.Store
);
router.get(
  "/findSubCategoryByCategory/:category_id",
  SubCategoryController.FindByCategory
);
router.get(
  "/findSubCategoryByCompany/:company_id",
  SubCategoryController.FindByCompany
);
router.put("/subCategories/:id", verifyToken, SubCategoryController.Update);
router.put(
  "/updateSubCategoriesIcon/:id",
  verifyToken,
  SubCategoryController.UpdateIcon
);
router.put(
  "/subCategoriesActive/:id",
  verifyToken,
  SubCategoryController.Active
);

/** ------------------------ PRODUCTS -------------------------- */
router.get("/products/:id", ProductsController.ShowByCompany);
router.post("/products/:company_id", verifyToken, ProductsController.Store);
router.put(
  "/productsThumbnail/:id",
  Multer.single("thumbnail"),
  upload,
  ProductsController.Thumbnail
);
router.put("/products/:id", verifyToken, ProductsController.UpdateInfo);
router.put("/productsActive/:id", verifyToken, ProductsController.Active);
router.put("/productsTaxes/:id", verifyToken, ProductsController.UpdateTaxes);
router.get(
  "/showCategoriesByProduct/:id",
  verifyToken,
  ProductsController.FindCategories
);
router.get(
  "/showSubCategoriesProduct/:id",
  verifyToken,
  ProductsController.FindSubCategories
);
router.post(
  "/storeImagesProduct/:id",
  Multer.single("image"),
  upload,
  ProductsController.StoreImages
);

/** ------------------------- SHIPPING ----------------------- */
router.post("/shipping", ShippingControl.FindPrice);

export { router };
