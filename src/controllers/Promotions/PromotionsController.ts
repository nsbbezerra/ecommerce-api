import { prismaClient } from "../../../database/prisma";
import { bucket } from "../../services/firebase";
import { NextFunction, Request, Response } from "express";

interface CustomProp extends Request {
  firebaseUrl?: string;
  firebaseId?: string;
}

async function delPromo(id: string) {
  await prismaClient.promotion.delete({
    where: { id },
  });
}

export class PromotionsController {
  async Store(req: CustomProp, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const { title, description, discount } = req.body;
    const { firebaseId, firebaseUrl } = req;

    try {
      await prismaClient.promotion.create({
        data: {
          company_id,
          banner: firebaseUrl,
          banner_id: firebaseId,
          title,
          description,
          discount: !discount ? 0 : parseFloat(discount),
        },
      });

      const promotions = await prismaClient.promotion.findMany({
        where: { company_id },
        orderBy: { title: "asc" },
      });

      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso", promotions });
    } catch (error) {
      next(error);
    }
  }
  async UpdateInfo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { title, description, discount } = req.body;

    try {
      await prismaClient.promotion.update({
        where: { id },
        data: {
          title,
          description,
          discount: !discount ? 0 : parseFloat(discount),
        },
      });
      return res
        .status(200)
        .json({ message: "Informações alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async GetPromotions(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const promotions = await prismaClient.promotion.findMany({
        where: { company_id },
        orderBy: { title: "asc" },
      });
      return res.status(200).json(promotions);
    } catch (error) {
      next(error);
    }
  }
  async DeletePromotion(req: Request, res: Response, next: NextFunction) {
    const { id, name } = req.params;
    try {
      await prismaClient.product.updateMany({
        where: { promotions: { contains: id } },
        data: {
          in_promotion: false,
          promotions: "",
          profit_percent: 0,
        },
      });
      const files = bucket.file(name).delete();

      files
        .then(() => {
          delPromo(id);

          return res
            .status(200)
            .json({ message: "Informações excluídas com sucesso" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      next(error);
    }
  }
  async SetPromotional(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { in_promotion, promotions, profit_percent } = req.body;

    try {
      await prismaClient.product.update({
        where: { id },
        data: {
          in_promotion,
          promotions,
          profit_percent: !profit_percent ? 0 : parseFloat(profit_percent),
        },
      });

      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
