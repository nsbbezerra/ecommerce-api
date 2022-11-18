import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class PayFormController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const { name, tag, is_installments, installments, interval_days } =
      req.body;

    try {
      await prismaClient.payForms.create({
        data: {
          company_id,
          name,
          tag,
          is_installments,
          installments: !installments ? 0 : parseInt(installments),
          interval_days,
        },
      });
      const payForms = await prismaClient.payForms.findMany({
        where: { company_id },
        orderBy: { name: "asc" },
      });

      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso", payForms });
    } catch (error) {
      next(error);
    }
  }
  async Update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, tag, is_installments, installments, interval_days } =
      req.body;

    try {
      await prismaClient.payForms.update({
        where: { id },
        data: {
          name,
          tag,
          is_installments,
          installments: !installments ? 0 : parseInt(installments),
          interval_days,
        },
      });
      return res
        .status(201)
        .json({ message: "Informações alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async Active(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { active } = req.body;

    try {
      await prismaClient.payForms.update({
        where: { id },
        data: {
          active,
        },
      });
      return res
        .status(201)
        .json({ message: "Informações alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async Find(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const payForms = await prismaClient.payForms.findMany({
        where: { company_id },
        orderBy: { name: "asc" },
      });
      return res.status(200).json(payForms);
    } catch (error) {
      next(error);
    }
  }
  async FindByPaymentOrder(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const payForms = await prismaClient.payForms.findMany({
        where: { company_id, active: true },
        orderBy: { name: "asc" },
      });
      return res.status(200).json(payForms);
    } catch (error) {
      next(error);
    }
  }
}
