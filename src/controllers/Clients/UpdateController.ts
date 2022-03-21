import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { configs } from "../../configs";

export class UpdateClientController {
  async UpdateInfo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
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
    } = req.body;

    try {
      await prismaClient.client.update({
        where: { id },
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
        },
      });
      return res
        .status(201)
        .json({ message: "As informações foram alteradas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  /** ESTA FUNÇÃO ESTÁ INCOMPLETA, INTEGRAR NA TWILLIO */
  async RequestUpdatePassword(req: Request, res: Response, next: NextFunction) {
    const { cpf, phone } = req.body;

    try {
      const client = await prismaClient.client.findFirst({
        where: { cpf },
      });
    } catch (error) {
      next(error);
    }
  }

  async UpdatePassword(req: Request, res: Response, next: NextFunction) {
    const { token } = req.params;
    const { cpf, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
      const myAccess = token.toString();
      await jwt.verify(myAccess, configs.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            message: "Você não está autorizado a realizar esta operação",
          });
        } else {
          prismaClient.client.update({
            where: { cpf },
            data: {
              password: hash,
            },
          });
          return res
            .status(201)
            .json({ message: "Sua senha foi alterada com sucesso" });
        }
      });
    } catch (error) {}
  }
}
