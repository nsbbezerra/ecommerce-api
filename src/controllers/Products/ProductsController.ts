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
      taxes,
      tags,
      thumbnail,
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
          taxes,
          tags,
          thumbnail,
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
    const { taxes } = req.body;

    try {
      await prismaClient.product.update({
        where: { id },
        data: {
          taxes,
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
