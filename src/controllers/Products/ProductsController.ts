import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";
import { configs } from "../../configs";

interface CustomProp extends Request {
  firebaseUrl?: string;
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
      weight,
      liter,
      length,
      width,
      unity,
      details,
      tags,
      shipping,
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
          inventory: parseInt(inventory),
          weight: parseFloat(weight),
          liter: parseFloat(liter),
          length: parseFloat(length),
          width,
          unity,
          details,
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
          tags,
          shipping,
          isTributed,
        },
      });
      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso", product });
    } catch (error) {
      next(error);
    }
  }
  async Thumbnail(req: CustomProp, res: Response, next: NextFunction) {
    const { firebaseUrl } = req;
    const { id } = req.params;

    try {
      await prismaClient.product.update({
        where: { id },
        data: {
          thumbnail: firebaseUrl,
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
      calc_price,
      markup_factor,
      cost_value,
      profit_percent,
      sale_value,
      type_unit,
      unit_desc,
      inventory,
      weight,
      liter,
      length,
      width,
      unity,
      details,
      tags,
      shipping,
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
          calc_price,
          markup_factor,
          cost_value,
          profit_percent,
          sale_value,
          type_unit,
          unit_desc,
          inventory,
          weight,
          liter,
          length,
          width,
          unity,
          details,
          tags,
          shipping,
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
      await prismaClient.product.update({
        where: { id },
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
    const { firebaseUrl } = req;
    try {
      await prismaClient.image.create({
        data: {
          product_id: id,
          image: firebaseUrl || "",
          image_id: "none",
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
}
