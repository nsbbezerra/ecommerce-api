import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configs } from "../../configs";

export class EmployeeController {
  async Store(req: Request, res: Response, next: NextFunction) {
    const { name, phone, user, password, permission } = req.body;
    const { company_id } = req.params;
    const hash = await bcrypt.hash(password, 10);
    try {
      await prismaClient.employee.create({
        data: {
          company_id,
          name,
          phone,
          user,
          password: hash,
          permission,
        },
      });
      return res
        .status(201)
        .json({ message: "Os dados foram inseridos com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async ChangePermission(req: Request, res: Response, next: NextFunction) {
    const { permission } = req.body;
    const { id } = req.params;

    try {
      await prismaClient.employee.update({
        where: { id },
        data: { permission },
      });
      return res
        .status(201)
        .json({ message: "As alterações foram concluídas com sucesso" });
    } catch (error) {
      next(error);
    }
  }

  async Active(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { active } = req.body;

    try {
      await prismaClient.employee.update({
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

  async Login(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;
    const { user, password } = req.body;

    try {
      if (!company_id) {
        return res.status(400).json({ message: "Empresa não encontrada" });
      }

      const employee = await prismaClient.employee.findFirst({
        where: { company_id, user },
      });

      if (!employee) {
        return res.status(400).json({
          message: "Usuário não encontrado, ou erro no código da empresa",
        });
      }

      if (!(await bcrypt.compare(password, employee?.password || ""))) {
        return res.status(400).json({ message: "Senha inválida" });
      }

      if (!employee.active) {
        return res.status(400).json({ message: "Usuário não autorizado" });
      }

      const token = jwt.sign({ user: employee.id }, configs.secret, {
        expiresIn: 36000,
      });
      const information = {
        user: {
          id: employee.id,
          name: employee.name,
          permission: employee.permission,
        },
        token,
      };
      return res.status(200).json(information);
    } catch (error) {
      next(error);
    }
  }

  async Find(req: Request, res: Response, next: NextFunction) {
    const { company_id } = req.params;

    try {
      const employees = await prismaClient.employee.findMany({
        where: { company_id },
        select: {
          active: true,
          company_id: true,
          id: true,
          name: true,
          permission: true,
          phone: true,
          user: true,
        },
        orderBy: { name: "asc" },
      });
      return res.status(200).json(employees);
    } catch (error) {
      next(error);
    }
  }

  async UpdateAuth(req: Request, res: Response, next: NextFunction) {
    const { user, password } = req.body;
    const { id } = req.params;
    const hash = await bcrypt.hash(password, 10);

    try {
      await prismaClient.employee.update({
        where: { id },
        data: { user, password: hash },
      });
      return res
        .status(201)
        .json({ message: "Alteração concluída com sucesso" });
    } catch (error) {
      next(error);
    }
  }
}
