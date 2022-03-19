import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

export class UpdateCompanyController {
  async UpdateInfo(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      cnpj,
      fantasy_name,
      municipal_registration,
      state_registration,
      phone,
      email,
      street,
      number,
      district,
      comp,
      zip_code,
      city,
      state,
    } = req.body;
    const { id } = req.params;

    try {
      await prismaClient.company.update({
        where: { id },
        data: {
          name,
          cnpj,
          fantasy_name,
          municipal_registration,
          state_registration,
          phone,
          email,
          street,
          number,
          district,
          comp,
          zip_code,
          city,
          state,
        },
      });
      return res
        .status(201)
        .json({ message: "As alterações foram concluídas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async UpdateExpiresDate(req: Request, res: Response, next: NextFunction) {
    const { expires_code_date } = req.body;
    const { id } = req.params;

    try {
      await prismaClient.company.update({
        where: { id },
        data: { expires_code_date },
      });
      return res
        .status(201)
        .json({ message: "As alterações foram concluídas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async ActiveCompany(req: Request, res: Response, next: NextFunction) {
    const { active } = req.body;
    const { id } = req.params;

    try {
      await prismaClient.company.update({
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
