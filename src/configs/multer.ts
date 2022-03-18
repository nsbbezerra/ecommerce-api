import multer from "multer";

const multerConfig = {
  storage: multer.memoryStorage(),
};

export { multerConfig };
