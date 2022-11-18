import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../../database/prisma";

type SizeProps = {
  id: string;
  description: string;
  inventory: number;
};

type PartitionSaleProps = {
  id: string;
  name: string;
  value: number;
};

type ProductSaleProps = {
  id: string;
  product_id: string;
  thumbnail: string;
  name: string;
  quantity: number;
  in_promotion: boolean;
  profit_percent: number;
  type:
    | "square_meter"
    | "meter"
    | "unity"
    | "weight"
    | "liter"
    | "without"
    | "sizes";
  unity: string;
  sale_value: number;
  sale_total: number;
  partition: PartitionSaleProps[] | null;
  adictional: PartitionSaleProps[] | null;
  widths: number | null;
  height: number;
  size: SizeProps | null;
};

type OrderProps = {
  total_order: number;
  discount: number;
  total_to_pay: number;
  checkout_id: string;
  payment_status: "wait" | "paid_out" | "refused" | "cancel";
  order_status:
    | "awaiting_payment"
    | "in_separation"
    | "cancel"
    | "order_dispatched"
    | "finish";
  origin: "ecommerce" | "pdv";
  month: string;
  year: string;
};

type OrderItemProps = {
  oder_id: string;
  product_id: string;
  quantity: number;
  in_promotion: boolean;
  profit_percent: number;
  type:
    | "square_meter"
    | "meter"
    | "unity"
    | "weight"
    | "liter"
    | "without"
    | "sizes";
  sale_value: number;
  sale_total: number;
  partition: string;
  adictional: string;
  widths: number;
  height: number;
  size: string;
};

interface BodyProps {
  items: ProductSaleProps[];
  client: string;
  order: OrderProps;
}

async function storeItems(item: OrderItemProps) {
  await prismaClient.ordertItems.create({
    data: {
      in_promotion: item.in_promotion,
      profit_percent: item.profit_percent,
      quantity: item.quantity,
      sale_total: item.sale_total,
      sale_value: item.sale_value,
      type: item.type,
      adictional: item.adictional,
      height: item.height,
      order_id: item.oder_id,
      product_id: item.product_id,
      partition: item.partition,
      size: item.size,
      widths: item.widths,
    },
  });
}

export class OrdersPdv {
  async Create(req: Request, res: Response, next: NextFunction) {
    const { company_id, employee_id } = req.params;
    const { client, items, order }: BodyProps = req.body;

    try {
      const newOrder = await prismaClient.order.create({
        data: {
          checkout_id: order.checkout_id,
          discount: order.discount,
          month: order.month,
          order_status: order.order_status,
          origin: order.origin,
          payment_status: order.payment_status,
          total_order: order.total_order,
          total_to_pay: order.total_to_pay,
          year: order.year,
          client_id: client,
          company_id,
          employee_id,
        },
      });

      const orderId = newOrder.id;

      await items.forEach((item) => {
        let info: OrderItemProps = {
          oder_id: orderId,
          product_id: item.product_id,
          quantity: item.quantity,
          in_promotion: item.in_promotion,
          profit_percent: item.profit_percent,
          type: item.type,
          sale_value: item.sale_value,
          sale_total: item.sale_total,
          partition:
            item.partition === null ? "[]" : JSON.stringify(item.partition),
          adictional:
            item.adictional === null ? "[]" : JSON.stringify(item.adictional),
          widths: item.widths === null ? 0 : item.widths,
          height: item.height === null ? 0 : item.height,
          size: item.size === null ? "[]" : JSON.stringify(item.size),
        };
        storeItems(info);
      });
      const orderInfo = {
        id: orderId,
        value: newOrder.total_to_pay,
      };
      return res.status(201).json({
        message: "Venda inserida com sucesso, aguarde para o pagamento",
        orderInfo,
      });
    } catch (error) {
      next(error);
    }
  }
}
