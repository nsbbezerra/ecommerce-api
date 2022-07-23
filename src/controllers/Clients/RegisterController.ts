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
      await prismaClient.client.create({
        data: {
          company_id,
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
      return res
        .status(201)
        .json({ message: "Informações inseridas com sucesso" });
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
          company: {
            select: {
              id: true,
              name: true,
              fantasy_name: true,
            },
          },
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
      const clients = await prismaClient.client.findMany({
        where: { company_id },
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
