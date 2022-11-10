import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class ListPDVController {
  async Dependents(req: Request, res: Response, next: NextFunction) {
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
      const adictional_items =
        await prismaClient.addictionalItemCategory.findMany({
          where: { company_id },
          select: {
            id: true,
            title: true,
            AddictionalItem: {
              where: { active: true },
              select: {
                id: true,
                name: true,
                value: true,
                addictional_item_category_id: true,
              },
            },
          },
        });
      const partition_sale = await prismaClient.partitionSaleCategory.findMany({
        where: { company_id },
        select: {
          id: true,
          name: true,
          PartitionSale: {
            where: { active: true },
            select: {
              id: true,
              partition_sale_category_id: true,
              name: true,
              value: true,
            },
          },
        },
      });
      return res
        .status(200)
        .json({ clients, adictional_items, partition_sale });
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
