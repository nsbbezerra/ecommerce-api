import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class RevenuesController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const {
      title,
      description,
      value,
      payment_method,
      payment_status,
      due_date,
    } = req.body;

    try {
      let dataNow = new Date(due_date);
      let month = dataNow.toLocaleString("pt-Br", { month: "long" });
      let year = dataNow.getFullYear().toString();
      await prismaClient.revenue.create({
        data: {
          title,
          description,
          value,
          payment_method,
          payment_status,
          due_date,
          month,
          year,
          company_id,
        },
      });

      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async Update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const {
      title,
      description,
      value,
      payment_method,
      payment_status,
      due_date,
    } = req.body;

    try {
      let dataNow = new Date(due_date);
      let month = dataNow.toLocaleString("pt-Br", { month: "long" });
      let year = dataNow.getFullYear().toString();

      await prismaClient.revenue.update({
        where: { id },
        data: {
          title,
          description,
          value,
          payment_method,
          payment_status,
          due_date,
          month,
          year,
        },
      });
      return res
        .status(201)
        .json({ message: "Alterações inseridas com sucesso" });
    } catch (error) {
      next(error);
    }
  }
  async Find(req: Request, res: Response, next: NextFunction) {
    const { company_id, type, month, year } = req.params;

    try {
      if (type === "actual") {
        let dataNow = new Date();
        let monthAct = dataNow.toLocaleString("pt-Br", { month: "long" });
        let yearAct = dataNow.getFullYear().toString();
        const revenues = await prismaClient.revenue.findMany({
          where: { company_id, month: monthAct, year: yearAct },
          orderBy: { due_date: "asc" },
        });
        return res.status(201).json(revenues);
      }
      if (type === "period") {
        const revenues = await prismaClient.revenue.findMany({
          where: { company_id, month, year },
          orderBy: { due_date: "asc" },
        });
        return res.status(201).json(revenues);
      }
    } catch (error) {
      next(error);
    }
  }
}
