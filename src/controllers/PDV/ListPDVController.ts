import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class ListPDVController {
  async Clients(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const clients = await prismaClient.client.findMany({
        where: { company_id },
        select: {
          name: true,
          id: true,
          cpf: true,
          phone: true,
          street: true,
          number: true,
          comp: true,
          district: true,
          zip_code: true,
          state: true,
          city: true,
        },
        orderBy: { name: "asc" },
      });
      return res.status(200).json(clients);
    } catch (error) {
      next(error);
    }
  }
  async Products(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const products = await prismaClient.product.findMany({
        where: { company_id, active: true },
        select: {
          id: true,
          title: true,
          thumbnail: true,
          barcode: true,
          sku: true,
          in_promotion: true,
          sale_value: true,
          profit_percent: true,
          sub_category: {
            select: {
              title: true,
            },
          },
          category: {
            select: {
              title: true,
            },
          },
          unit_desc: true,
          type_unit: true,
          have_adictional: true,
          type_sale: true,
          sale_options: true,
          sale_options_category: true,
          adictional_items_id: true,
        },
        orderBy: { title: "asc" },
      });
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
}
