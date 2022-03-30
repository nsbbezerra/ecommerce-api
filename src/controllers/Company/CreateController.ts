import { Request, NextFunction, Response } from "express";
import { prismaClient } from "../../../database/prisma";

interface CustomProp extends Request {
  firebaseUrl?: string;
}

export class CreateCompanyController {
  async Store(req: Request, res: Response, next: NextFunction) {
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
      type_activation,
    } = req.body;

    try {
      await prismaClient.company.create({
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
          type_activation,
        },
      });
      return res
        .status(201)
        .json({ message: "Suas informações foram inseridas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async CreateAuthorization(req: Request, res: Response, next: NextFunction) {
    const { expires_code_date, company_code } = req.body;
    const { id } = req.params;

    try {
      const authorization = await prismaClient.company.update({
        where: { id: id },
        data: { expires_code_date, company_code },
      });
      return res.status(201).json({
        message: "As alterações foram concluídas com sucesso",
        authorization,
      });
    } catch (error) {
      next(error);
    }
  }

  async UpdateThumbnail(req: CustomProp, res: Response, next: NextFunction) {
    const { firebaseUrl } = req;
    const { id } = req.params;

    try {
      console.log(firebaseUrl);
      await prismaClient.company.update({
        where: { id },
        data: { thumbnail: firebaseUrl },
      });
      return res
        .status(201)
        .json({ message: "Imagem carregada com sucesso", image: firebaseUrl });
    } catch (error) {
      next(error);
    }
  }

  async FindCompanyById(req: CustomProp, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const company = await prismaClient.company.findFirst({
        where: { id },
      });
      return res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }

  async FindCompany(req: CustomProp, res: Response, next: NextFunction) {
    try {
      const companies = await prismaClient.company.findMany();
      return res.status(200).json(companies);
    } catch (error) {
      next(error);
    }
  }

  async GetInformation(req: CustomProp, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const { code } = req.body;

    try {
      const company = await prismaClient.company.findFirst({
        where: { id: company_id, company_code: code },
      });

      if (!company) {
        return res.status(400).json({ message: "Empresa não encontrada" });
      }

      return res.status(200).json(company);
    } catch (error) {
      next(error);
    }
  }
}
