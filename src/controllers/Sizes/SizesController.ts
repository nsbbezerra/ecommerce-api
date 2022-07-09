import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class SizesController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { product_id, description, inventory } = req.body;

    try {
      await prismaClient.sizes.create({
        data: {
          product_id,
          description,
          inventory: parseInt(inventory),
        },
      });

      const sizes = await prismaClient.sizes.findMany({
        where: { product_id },
        orderBy: { description: "asc" },
      });

      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso", sizes });
    } catch (error) {
      next(error);
    }
  }
  async Update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { description, inventory } = req.body;

    try {
      await prismaClient.sizes.update({
        where: { id },
        data: {
          description,
          inventory: parseInt(inventory),
        },
      });
      return res
        .status(201)
        .json({ message: "Informações alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async Delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await prismaClient.sizes.delete({
        where: { id },
      });
      return res
        .status(201)
        .json({ message: "Informações excluídas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async UpdateInventory(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { inventory } = req.body;

    try {
      await prismaClient.sizes.update({
        where: { id },
        data: {
          inventory: parseInt(inventory),
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async Find(req: Request, res: Response, next: NextFunction) {
    const { product_id } = req.params;

    try {
      const sizes = await prismaClient.sizes.findMany({
        where: { product_id },
        orderBy: { description: "asc" },
      });

      return res.status(200).json(sizes);
    } catch (error) {
      next(error);
    }
  }
}
