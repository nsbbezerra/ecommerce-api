import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";
import bcrypt from "bcrypt";

export class RegisterClientController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const {
      name,
      cpf,
      phone,
      email,
      street,
      number,
      comp,
      district,
      zip_code,
      city,
      state,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    try {
      const client = await prismaClient.client.findFirst({
        where: { cpf },
      });

      if (client) {
        await prismaClient.clientsCompanies.create({
          data: {
            client_id: client.id,
            company_id: company_id,
          },
        });
        return res
          .status(201)
          .json({ message: "As informações foram inseridas com sucesso" });
      } else {
        const client = await prismaClient.client.create({
          data: {
            name,
            cpf,
            phone,
            email,
            street,
            number,
            comp,
            district,
            zip_code,
            city,
            state,
            password: hash,
          },
        });
        await prismaClient.clientsCompanies.create({
          data: {
            client_id: client.id,
            company_id: company_id,
          },
        });
        return res
          .status(201)
          .json({ message: "As informações foram inseridas com sucesso" });
      }
    } catch (error) {
      next(error);
    }
  }

  async Find(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await prismaClient.client.findMany({
        orderBy: { name: "asc" },
        select: {
          name: true,
          city: true,
          comp: true,
          cpf: true,
          district: true,
          email: true,
          id: true,
          number: true,
          password: false,
          phone: true,
          state: true,
          street: true,
          zip_code: true,
        },
      });
      return res.status(200).json(clients);
    } catch (error) {
      next(error);
    }
  }

  async FindByCompany(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const clients = await prismaClient.clientsCompanies.findMany({
        where: { company_id },
        select: {
          company: true,
          client: {
            select: {
              name: true,
              city: true,
              comp: true,
              cpf: true,
              district: true,
              email: true,
              id: true,
              number: true,
              password: false,
              phone: true,
              state: true,
              street: true,
              zip_code: true,
            },
          },
        },
      });
      return res.status(200).json(clients);
    } catch (error) {
      next(error);
    }
  }

  async FindById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const client = await prismaClient.client.findFirst({
        where: { id },
        select: {
          name: true,
          city: true,
          comp: true,
          cpf: true,
          district: true,
          email: true,
          id: true,
          number: true,
          password: false,
          phone: true,
          state: true,
          street: true,
          zip_code: true,
        },
      });
      return res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }
}
