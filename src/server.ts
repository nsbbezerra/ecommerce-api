import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerConfigs from "./configs/swagger.json";

interface HTTPError extends Error {
  status?: number;
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfigs));
app.use((error: HTTPError, req: Request, res: Response, next: NextFunction) => {
  const message = error.message;
  return res.status(400).json({
    message: `Um erro ocorreu ao processar a operação. ERRO: ${message}`,
    error: { message, status: error.status },
  });
});

app.listen(4003, () => {
  console.log("Server is running on PORT 4003");
});
