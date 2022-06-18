import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class AdictionalItemsController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, value } = req.body;

    try {
      await prismaClient.addictionalItem.create({
        data: {
          product_id: id,
          name,
          value,
        },
      });
      const items = await prismaClient.addictionalItem.findMany({
        where: { product_id: id },
        orderBy: { name: "asc" },
      });

      return res
        .status(201)
        .json({ message: "Informações salvas com sucesso", items });
    } catch (error) {
      next(error);
    }
  }
}
