import { NextFunction, Request, response, Response } from "express";
import { prismaClient } from "../../../database/prisma";
import { bucket } from "../../services/firebase";

async function deleteThumb(id: string) {
  await prismaClient.product.update({
    where: { id },
    data: {
      thumbnail: "",
      thumbnail_id: "",
    },
  });
}

async function deleteImage(id: string) {
  await prismaClient.image.delete({
    where: { id },
  });
}

export class ListProductsController {
  async ListTaxes(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const product = await prismaClient.taxes.findFirst({
        where: { product_id: id },
        select: {
          id: true,
          cfop: true,
          ncm: true,
          icms_rate: true,
          icms_origin: true,
          icms_csosn: true,
          icms_st_rate: true,
          icms_marg_val_agregate: true,
          icms_st_mod_bc: true,
          icms_base_calc: true,
          imcs_st_base_calc: true,
          fcp_rate: true,
          fcp_st_rate: true,
          fcp_ret_rate: true,
          fcp_base_calc: true,
          fcp_st_base_calc: true,
          ipi_cst: true,
          ipi_rate: true,
          ipi_code: true,
          pis_cst: true,
          pis_rate: true,
          pis_base_calc: true,
          cofins_cst: true,
          cofins_rate: true,
          cofins_base_calc: true,
          cest: true,
          isTributed: true,
        },
      });
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async ListInfo(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const product = await prismaClient.product.findFirst({
        where: { id },
        select: {
          title: true,
          description: true,
          sku: true,
          barcode: true,
          internal_code: true,
          type_unit: true,
          unit_desc: true,
          details: true,
          cost_value: true,
          type_sale: true,
          sale_options: true,
          sale_options_category: true,
          width: true,
          inventory: true,
          shipping: true,
        },
      });
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
  async DeleteThumbnail(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const files = bucket.file(name).delete();

      files
        .then(() => {
          deleteThumb(id);
          return res
            .status(200)
            .json({ message: "Imagem excluída com sucesso" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      next(error);
    }
  }
  async FindImages(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const thumbnail = await prismaClient.product.findFirst({
        where: { id },
        select: {
          thumbnail: true,
          thumbnail_id: true,
        },
      });

      const images = await prismaClient.image.findMany({
        where: { product_id: id },
      });

      let info = { thumbnail, images };

      return res.status(200).json(info);
    } catch (error) {
      next(error);
    }
  }
  async DeleteImage(req: Request, res: Response, next: NextFunction) {
    const { id, name } = req.params;

    try {
      const files = bucket.file(name).delete();

      files
        .then(() => {
          deleteImage(id);
          return res
            .status(200)
            .json({ message: "Imagem excluída com sucesso" });
        })
        .catch((err) => {
          next(err);
        });
    } catch (error) {
      next(error);
    }
  }
}
