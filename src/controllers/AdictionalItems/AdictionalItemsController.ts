import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class AdictionalItemsController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, value } = req.body;
    try {
      await prismaClient.addictionalItem.create({
        data: {
          addictional_item_category_id: id,
          name,
          value: parseFloat(value),
        },
      });

      const adictional_items = await prismaClient.addictionalItem.findMany({
        where: { addictional_item_category_id: id },
        orderBy: { name: "asc" },
      });

      return res.status(201).json({
        message: "Informações inseridas com sucesso",
        adictional_items,
      });
    } catch (error) {
      next(error);
    }
  }
  async StoreCategory(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const { title } = req.body;

    try {
      await prismaClient.addictionalItemCategory.create({
        data: {
          title,
          company_id,
        },
      });
      return res.status(201).json({
        message: "Informações inseridas com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
  async FindCategories(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const categories = await prismaClient.addictionalItemCategory.findMany({
        where: { company_id },
        orderBy: { title: "asc" },
      });

      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
  async FindAdictionalItems(req: Request, res: Response, next: NextFunction) {
    const { addictional_item_category_id } = req.params;

    try {
      const adictional_items = await prismaClient.addictionalItem.findMany({
        where: { addictional_item_category_id },
        orderBy: { name: "asc" },
      });

      return res.status(200).json(adictional_items);
    } catch (error) {
      next(error);
    }
  }
  async DeleteAdicionalItems(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await prismaClient.addictionalItem.delete({
        where: { id },
      });

      return res
        .status(200)
        .json({ message: "Informação excluída com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
