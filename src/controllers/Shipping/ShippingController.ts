import { calcularPrecoPrazo } from "correios-brasil";
import { NextFunction, Request, Response } from "express";

export class ShippingController {
  async FindPrice(req: Request, res: Response, next: NextFunction) {
    const {
      weight,
      format,
      length,
      width,
      height,
      diameter,
      originCep,
      destinyCep,
    } = req.body;

    try {
      let args = {
        sCepOrigem: originCep,
        sCepDestino: destinyCep,
        nVlPeso: weight,
        nCdFormato: format,
        nVlComprimento: length,
        nVlAltura: height,
        nVlLargura: width,
        nCdServico: ["04014", "04510"], //Array com os códigos de serviço
        nVlDiametro: diameter,
      };

      calcularPrecoPrazo(args)
        .then((response) => {
          return res.status(201).json(response);
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      next(error);
    }
  }
}
