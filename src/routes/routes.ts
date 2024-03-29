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
import { PartitioSaleController } from "../controllers/PartitionSale/PartitionSaleController";
import { AdictionalItemsController } from "../controllers/AdictionalItems/AdictionalItemsController";
import { ListProductsController } from "../controllers/Products/ListProductsController";
import { SizesController } from "../controllers/Sizes/SizesController";
import { PromotionsController } from "../controllers/Promotions/PromotionsController";
import { CouponsController } from "../controllers/Coupons/CouponsController";
import { PayFormController } from "../controllers/PayForm/PayFormController";
import { ExpensesController } from "../controllers/Expenses/ExpensesController";
import { RevenuesController } from "../controllers/Revenues/RevenuesController";
import { ListPDVController } from "../controllers/PDV/ListPDVController";
import { CashierController } from "../controllers/Cashier/CashierController";
import { OrdersPdv } from "../controllers/Orders/OrdersPdvController";

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
const PartitionSaleControl = new PartitioSaleController();
const AdictionalControl = new AdictionalItemsController();
const ProductListControl = new ListProductsController();
const SizesControl = new SizesController();
const PromotionControl = new PromotionsController();
const CouponsControll = new CouponsController();
const PayFormControll = new PayFormController();
const ExpensesControll = new ExpensesController();
const RevenuesControll = new RevenuesController();
const ListPDVControll = new ListPDVController();
const CashierControll = new CashierController();
const OrderControll = new OrdersPdv();

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
router.put(
  "/deleteThumbnailCompany/:id",
  verifyToken,
  AlterCompanyController.RemoveThumbnail
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
router.post(
  "/storeProductTaxes/:id",
  verifyToken,
  ProductsController.StoreTaxes
);
router.put(
  "/productsThumbnail/:id",
  Multer.single("thumbnail"),
  upload,
  ProductsController.Thumbnail
);
router.put(
  "/updateProductTax/:id/:product_id",
  verifyToken,
  ProductsController.UpdateTaxes
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
router.get("/findTaxesProduct/:id", ProductListControl.ListTaxes);
router.get("/listProductInformation/:id", ProductListControl.ListInfo);
router.put("/deleteThumbnail/:id", ProductListControl.DeleteThumbnail);
router.put(
  "/setAdicionalItems/:id",
  verifyToken,
  ProductsController.AddAdictionalItems
);
router.get("/findProductsImage/:id", ProductListControl.FindImages);
router.delete("/deleteProductImage/:id/:name", ProductListControl.DeleteImage);
router.get("/findAdicionalItems/:id", ProductListControl.FindAdicionalItems);

/** ------------------------- SHIPPING ----------------------- */
router.post("/shipping", ShippingControl.FindPrice);

/** ------------------------ PARTITION SALE ----------------- */
router.post(
  "/storeCategoryPartitionSale/:id",
  verifyToken,
  PartitionSaleControl.StoreCategory
);
router.post(
  "/storeItemsPartitionSale/:id",
  verifyToken,
  PartitionSaleControl.StorePartitionItens
);
router.get("/showCategoryPartitionSale/:id", PartitionSaleControl.ShowCategory);
router.get("/showItemsPartitionSale/:id", PartitionSaleControl.ShowItems);
router.delete(
  "/deleteItemPartition/:id",
  verifyToken,
  PartitionSaleControl.DeleteItems
);
router.put(
  "/updatePartitionCategory/:id",
  verifyToken,
  PartitionSaleControl.UpdateCategory
);
router.put(
  "/updatePartitionItem/:id",
  verifyToken,
  PartitionSaleControl.UpdateItems
);

/** ----------------------------- ADICTIONAL ITEMS ---------------------- */
router.post("/adictionalItems/:id", verifyToken, AdictionalControl.Store);
router.post(
  "/adicionalItemsCategory/:company_id",
  verifyToken,
  AdictionalControl.StoreCategory
);
router.get(
  "/adictionalItems/:addictional_item_category_id",
  AdictionalControl.FindAdictionalItems
);
router.get(
  "/categoryAdictionalItems/:company_id",
  AdictionalControl.FindCategories
);
router.delete(
  "/deleteAdictionalItems/:id",
  verifyToken,
  AdictionalControl.DeleteAdicionalItems
);
router.put(
  "/editAdicionalItemsCategory/:id",
  verifyToken,
  AdictionalControl.EditCategories
);
router.put(
  "/editAdicionalItems/:id",
  verifyToken,
  AdictionalControl.EditAdicionalItem
);

/** --------------------------- SIZES --------------------------- */
router.get("/findSizes/:product_id", SizesControl.Find);
router.post("/sizes", verifyToken, SizesControl.Store);
router.put("/sizes/:id", verifyToken, SizesControl.Update);
router.delete("/sizes/:id", verifyToken, SizesControl.Delete);
router.put("/updateSizes/:id", verifyToken, SizesControl.UpdateInventory);

/** ---------------------------- PROMOTIONS ------------------------- */
router.post(
  "/promotions/:company_id",
  Multer.single("banner"),
  upload,
  PromotionControl.Store
);
router.get("/promotions/:company_id", PromotionControl.GetPromotions);
router.put("/promotionsUpdate/:id", verifyToken, PromotionControl.UpdateInfo);
router.put(
  "/deletePromotions/:id/:name",
  verifyToken,
  PromotionControl.DeletePromotion
);
router.put(
  "/setPromotionalProduct/:id",
  verifyToken,
  PromotionControl.SetPromotional
);

/** --------------------------------- COUPONS ------------------------- */
router.get("/coupons/:company_id", CouponsControll.Find);
router.post("/coupons/:company_id", verifyToken, CouponsControll.Store);
router.delete("/coupons/:id", verifyToken, CouponsControll.DeleteCoupon);

/** ------------------------------- PAY FORM -------------------------- */
router.get("/pay_form/:company_id", PayFormControll.Find);
router.post("/pay_form/:company_id", verifyToken, PayFormControll.Store);
router.put("/pay_form/:id", verifyToken, PayFormControll.Update);
router.put("/pay_form_active/:id", verifyToken, PayFormControll.Active);
router.get(
  "/pay_form_pay_order/:company_id",
  PayFormControll.FindByPaymentOrder
);

/** ----------------------------- REVENUES ---------------------------- */
router.post("/revenues/:company_id", verifyToken, RevenuesControll.Store);
router.put("/revenues/:id", verifyToken, RevenuesControll.Update);
router.get("/revenues/:company_id/:type/:month/:year", RevenuesControll.Find);

/** ----------------------------- EXPENSES ---------------------------- */
router.post("/expenses/:company_id", verifyToken, ExpensesControll.Store);
router.put("/expenses/:id", verifyToken, ExpensesControll.Update);
router.get("/expenses/:company_id/:type/:month/:year", ExpensesControll.Find);

/** ----------------------------- PDV SALES --------------------------- */
router.get("/pdv_dependent/:company_id", ListPDVControll.Dependents);
router.get("/pdv_products/:company_id", ListPDVControll.Products);

/** ----------------------------- CASHIER ----------------------------- */
router.post("/cashier/:company_id", verifyToken, CashierControll.Create);
router.post("/find_cashier/:company_id", CashierControll.FindCashier);

/** ----------------------------- ORDERS ------------------------------ */
router.post(
  "/order/:company_id/:employee_id",
  verifyToken,
  OrderControll.Create
);

export { router };
