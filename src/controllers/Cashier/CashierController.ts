import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class CashierController {
  async Create(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const {
      employee_id,
      open_value,
      open_date,
      close_value,
      close_date,
      status,
    } = req.body;

    try {
      await prismaClient.cashier.create({
        data: {
          company_id,
          employee_id,
          open_date,
          open_value,
          close_date,
          close_value,
          status,
        },
      });
      return res.status(201).json({ message: "Caixa aberto com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async FindCashier(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const { search, value } = req.body;

    try {
      var cashiers;

      switch (search) {
        case "data":
          cashiers = await prismaClient.cashier.findMany({
            where: { company_id, open_date: value },
            select: {
              id: true,
              close_date: true,
              close_value: true,
              open_date: true,
              open_value: true,
              status: true,
              employee: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: { open_date: "desc" },
          });
          return res.status(200).json(cashiers);

        case "all":
          cashiers = await prismaClient.cashier.findMany({
            where: { company_id },
            select: {
              id: true,
              close_date: true,
              close_value: true,
              open_date: true,
              open_value: true,
              status: true,
              employee: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: { open_date: "desc" },
          });
          return res.status(200).json(cashiers);

        case "status":
          cashiers = await prismaClient.cashier.findMany({
            where: { company_id, status: value },
            select: {
              id: true,
              close_date: true,
              close_value: true,
              open_date: true,
              open_value: true,
              status: true,
              employee: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: { open_date: "desc" },
          });
          return res.status(200).json(cashiers);

        default:
          cashiers = await prismaClient.cashier.findMany({
            where: { company_id },
            select: {
              id: true,
              close_date: true,
              close_value: true,
              open_date: true,
              open_value: true,
              status: true,
              employee: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: { open_date: "desc" },
          });
          return res.status(200).json(cashiers);
      }
    } catch (error) {
      next(error);
    }
  }
}
