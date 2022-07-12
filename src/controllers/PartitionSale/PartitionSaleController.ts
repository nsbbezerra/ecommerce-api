import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class PartitioSaleController {
  async StoreCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      await prismaClient.partitionSaleCategory.create({
        data: {
          company_id: id,
          name,
        },
      });

      return res.status(201).json({ message: "Informação salva com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async UpdateCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      await prismaClient.partitionSaleCategory.update({
        where: { id },
        data: {
          name,
        },
      });
      return res
        .status(201)
        .json({ message: "Informações editadas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async StorePartitionItens(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, value } = req.body;
    try {
      await prismaClient.partitionSale.create({
        data: {
          partition_sale_category_id: id,
          name,
          value,
        },
      });
      const partition_items = await prismaClient.partitionSale.findMany({
        where: {
          partition_sale_category_id: id,
        },
        orderBy: {
          name: "asc",
        },
      });
      return res
        .status(201)
        .json({ message: "Informação inserida com sucesso", partition_items });
    } catch (error) {
      next(error);
    }
  }
  async UpdateItems(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, value } = req.body;

    try {
      await prismaClient.partitionSale.update({
        where: { id },
        data: {
          name,
          value: !value ? 0 : parseFloat(value),
        },
      });
      return res
        .status(201)
        .json({ message: "Informações atualizadas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async ShowCategory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const categories = await prismaClient.partitionSaleCategory.findMany({
        where: { company_id: id },
        orderBy: { name: "asc" },
      });
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }
  async ShowItems(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const items = await prismaClient.partitionSale.findMany({
        where: { partition_sale_category_id: id },
        orderBy: { name: "asc" },
      });

      return res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  }
  async DeleteItems(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await prismaClient.partitionSale.delete({
        where: { id },
      });
      return res
        .status(201)
        .json({ message: "Informação excluída com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
