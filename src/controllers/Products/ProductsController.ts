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
      thumbnail,
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
          inventory,
          weight,
          liter,
          length,
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
          thumbnail,
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
}
