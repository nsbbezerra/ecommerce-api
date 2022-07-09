import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

interface CustomProp extends Request {
  firebaseUrl?: string;
  firebaseId?: string;
}

export class ProductController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const {
      category_id,
      sub_category_id,
      title,
      description,
      sku,
      barcode,
      internal_code,
      calc_price,
      markup_factor,
      cost_value,
      profit_percent,
      sale_value,
      type_unit,
      unit_desc,
      inventory,
      width,
      unity,
      details,
      tags,
      shipping,
      type_sale,
      sale_options,
      sale_options_category,
    } = req.body;

    try {
      const product = await prismaClient.product.create({
        data: {
          company_id,
          category_id,
          sub_category_id,
          title,
          description,
          sku,
          barcode,
          internal_code,
          calc_price,
          markup_factor,
          cost_value,
          profit_percent,
          sale_value,
          type_unit,
          unit_desc,
          inventory: !inventory ? 0 : parseFloat(inventory),
          width,
          unity,
          details,
          tags,
          shipping,
          type_sale,
          sale_options,
          sale_options_category,
        },
      });
      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso", product });
    } catch (error) {
      next(error);
    }
  }
  async StoreTaxes(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const {
      cfop,
      ncm,
      icms_rate,
      icms_origin,
      icms_csosn,
      icms_st_rate,
      icms_marg_val_agregate,
      icms_st_mod_bc,
      icms_base_calc,
      imcs_st_base_calc,
      fcp_rate,
      fcp_st_rate,
      fcp_ret_rate,
      fcp_base_calc,
      fcp_st_base_calc,
      ipi_cst,
      ipi_rate,
      ipi_code,
      pis_cst,
      pis_rate,
      pis_base_calc,
      cofins_cst,
      cofins_rate,
      cofins_base_calc,
      cest,
      isTributed,
    } = req.body;

    try {
      await prismaClient.taxes.create({
        data: {
          product_id: id,
          cfop,
          ncm,
          icms_rate,
          icms_origin,
          icms_csosn,
          icms_st_rate,
          icms_marg_val_agregate,
          icms_st_mod_bc,
          icms_base_calc,
          imcs_st_base_calc,
          fcp_rate,
          fcp_st_rate,
          fcp_ret_rate,
          fcp_base_calc,
          fcp_st_base_calc,
          ipi_cst,
          ipi_rate,
          ipi_code,
          pis_cst,
          pis_rate,
          pis_base_calc,
          cofins_cst,
          cofins_rate,
          cofins_base_calc,
          cest,
          isTributed,
        },
      });
      return res
        .status(201)
        .json({ message: "Informações salvas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async Thumbnail(req: CustomProp, res: Response, next: NextFunction) {
    const { firebaseUrl, firebaseId } = req;
    const { id } = req.params;

    try {
      await prismaClient.product.update({
        where: { id },
        data: {
          thumbnail: firebaseUrl,
          thumbnail_id: firebaseId,
        },
      });

      return res
        .status(201)
        .json({ message: "Informação inserida com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async UpdateInfo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const {
      title,
      description,
      sku,
      barcode,
      internal_code,
      type_unit,
      unit_desc,
      details,
      cost_value,
      type_sale,
      sale_options,
      sale_options_category,
      width,
      inventory,
      shipping,
      sale_value,
    } = req.body;

    try {
      await prismaClient.product.update({
        where: { id },
        data: {
          title,
          description,
          sku,
          barcode,
          internal_code,
          type_unit,
          unit_desc,
          details,
          cost_value,
          type_sale,
          sale_options,
          sale_options_category,
          inventory: !inventory ? 0 : parseFloat(inventory),
          width,
          shipping,
          sale_value,
        },
      });

      return res
        .status(201)
        .json({ message: "Informações alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async Active(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { active } = req.body;

    try {
      await prismaClient.product.update({
        where: { id },
        data: { active },
      });
      return res
        .status(201)
        .json({ message: "Informações alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async UpdateTaxes(req: Request, res: Response, next: NextFunction) {
    const { id, product_id } = req.params;
    const {
      cfop,
      ncm,
      icms_rate,
      icms_origin,
      icms_csosn,
      icms_st_rate,
      icms_marg_val_agregate,
      icms_st_mod_bc,
      icms_base_calc,
      imcs_st_base_calc,
      fcp_rate,
      fcp_st_rate,
      fcp_ret_rate,
      fcp_base_calc,
      fcp_st_base_calc,
      ipi_cst,
      ipi_rate,
      ipi_code,
      pis_cst,
      pis_rate,
      pis_base_calc,
      cofins_cst,
      cofins_rate,
      cofins_base_calc,
      cest,
      isTributed,
    } = req.body;

    try {
      const findTax = await prismaClient.taxes.findFirst({
        where: { id: id },
      });

      if (findTax) {
        await prismaClient.taxes.update({
          where: { id: id },
          data: {
            cfop,
            ncm,
            icms_rate,
            icms_origin,
            icms_csosn,
            icms_st_rate,
            icms_marg_val_agregate,
            icms_st_mod_bc,
            icms_base_calc,
            imcs_st_base_calc,
            fcp_rate,
            fcp_st_rate,
            fcp_ret_rate,
            fcp_base_calc,
            fcp_st_base_calc,
            ipi_cst,
            ipi_rate,
            ipi_code,
            pis_cst,
            pis_rate,
            pis_base_calc,
            cofins_cst,
            cofins_rate,
            cofins_base_calc,
            cest,
            isTributed,
          },
        });
      } else {
        await prismaClient.taxes.create({
          data: {
            product_id,
            cfop,
            ncm,
            icms_rate,
            icms_origin,
            icms_csosn,
            icms_st_rate,
            icms_marg_val_agregate,
            icms_st_mod_bc,
            icms_base_calc,
            imcs_st_base_calc,
            fcp_rate,
            fcp_st_rate,
            fcp_ret_rate,
            fcp_base_calc,
            fcp_st_base_calc,
            ipi_cst,
            ipi_rate,
            ipi_code,
            pis_cst,
            pis_rate,
            pis_base_calc,
            cofins_cst,
            cofins_rate,
            cofins_base_calc,
            cest,
            isTributed,
          },
        });
      }
      return res
        .status(201)
        .json({ message: "Informações alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async ShowByCompany(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const products = await prismaClient.product.findMany({
        orderBy: { title: "asc" },
        select: {
          id: true,
          thumbnail: true,
          title: true,
          sku: true,
          sale_value: true,
          active: true,
          in_promotion: true,
          type_unit: true,
          unit_desc: true,
          inventory: true,
          type_sale: true,
          width: true,
        },
        where: { company_id: id },
      });
      return res.status(201).json(products);
    } catch (error) {
      next(error);
    }
  }
  async FindCategories(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const categories = await prismaClient.category.findMany({
        where: { active: true, company_id: id },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          title: "asc",
        },
      });
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
  async FindSubCategories(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const subCategories = await prismaClient.subCat.findMany({
        where: {
          category_id: id,
        },
        select: {
          id: true,
          title: true,
        },
        orderBy: {
          title: "asc",
        },
      });
      return res.status(200).json(subCategories);
    } catch (error) {
      next(error);
    }
  }
  async StoreImages(req: CustomProp, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { firebaseUrl, firebaseId } = req;
    try {
      await prismaClient.image.create({
        data: {
          product_id: id,
          image: firebaseUrl || "",
          image_id: firebaseId || "",
        },
      });

      const images = await prismaClient.image.findMany({
        where: { product_id: id },
        select: { id: true, image: true },
        orderBy: { created_at: "asc" },
      });

      return res
        .status(201)
        .json({ message: "Imagem inserida com sucesso", images });
    } catch (error) {
      next(error);
    }
  }
  async AddAdictionalItems(req: CustomProp, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { adictional } = req.body;

    try {
      await prismaClient.product.update({
        where: {
          id,
        },
        data: {
          adictional_items_id: adictional,
        },
      });
      return res
        .status(201)
        .json({ message: "Informação inserida com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
