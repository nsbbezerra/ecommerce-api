import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class SubCategoriesController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { company_id, category_id } = req.params;
    const { title, description, icon } = req.body;

    try {
      await prismaClient.subCat.create({
        data: {
          company_id,
          category_id,
          title,
          description,
          icon,
        },
      });
      return res
        .status(201)
        .json({ message: "As informações foram inseridas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async FindByCompany(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const sub_categories = await prismaClient.subCat.findMany({
        where: { company_id },
        orderBy: { title: "asc" },
      });
      return res.status(200).json(sub_categories);
    } catch (error) {
      next(error);
    }
  }

  async FindByCategory(req: Request, res: Response, next: NextFunction) {
    const { category_id } = req.params;

    try {
      const sub_categories = await prismaClient.subCat.findMany({
        where: { category_id },
        orderBy: { title: "asc" },
      });
      return res.status(200).json(sub_categories);
    } catch (error) {
      next(error);
    }
  }

  async Update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, description, icon } = req.body;

    try {
      await prismaClient.subCat.update({
        where: { id },
        data: {
          title,
          description,
          icon,
        },
      });
      return res
        .status(201)
        .json({ message: "As alterações foram concluídas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async Active(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { active } = req.body;

    try {
      await prismaClient.subCat.update({
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
