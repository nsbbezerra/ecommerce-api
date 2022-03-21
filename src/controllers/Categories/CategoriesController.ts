import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class CategoriesController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const { title, description, icon } = req.body;

    try {
      await prismaClient.category.create({
        data: {
          title,
          description,
          icon,
          company_id,
        },
      });

      return res
        .status(201)
        .json({ message: "As informações foram inseridas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, description, icon } = req.body;

    try {
      await prismaClient.category.update({
        where: { id },
        data: { title, description, icon },
      });
      return res
        .status(201)
        .json({ message: "As informações foram alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async List(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const categories = await prismaClient.category.findMany({
        where: { company_id },
        orderBy: { title: "asc" },
      });
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  async Active(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { active } = req.body;

    try {
      await prismaClient.category.update({
        where: { id },
        data: { active },
      });

      return res
        .status(201)
        .json({ message: "As alterações foram concluídas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
