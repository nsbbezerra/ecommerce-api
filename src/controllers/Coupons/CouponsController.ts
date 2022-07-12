import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class CouponsController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const { coupon, dicount, period, number_used, expires_date } = req.body;

    try {
      await prismaClient.coupon.create({
        data: {
          company_id,
          coupon,
          dicount: !dicount ? 0 : parseFloat(dicount),
          period,
          number_used: !number_used ? 0 : parseInt(number_used),
          expires_date,
        },
      });
      const coupons = await prismaClient.coupon.findMany({
        where: { company_id },
        orderBy: { coupon: "asc" },
      });
      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso", coupons });
    } catch (error) {
      next(error);
    }
  }
  async DeleteCoupon(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await prismaClient.coupon.delete({
        where: { id },
      });
      return res
        .status(201)
        .json({ message: "Informações removidas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async Find(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const coupons = await prismaClient.coupon.findMany({
        where: { company_id },
        orderBy: { coupon: "asc" },
      });
      return res.status(201).json(coupons);
    } catch (error) {
      next(error);
    }
  }
}
