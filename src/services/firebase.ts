import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import private_key from "../configs/private_key.json";

interface CustomProp extends Request {
  firebaseUrl?: string;
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: private_key.project_id,
    clientEmail: private_key.client_email,
    privateKey: private_key.private_key,
  }),
  storageBucket: "gs://ecommerce-18d83.appspot.com",
});

const bucket = admin.storage().bucket();

const upload = (req: CustomProp, res: Response, next: NextFunction) => {
  if (!req.file) {
    next();
  }

  const image = req.file;
  const name = `${Date.now()}.${image?.originalname.split(".").pop()}`;
  const file = bucket.file(name);

  const stream = file.createWriteStream({
    metadata: {
      contentType: image?.mimetype,
    },
  });
  stream.on("error", (err) => {
    next(err);
  });
  stream.on("finish", async () => {
    await file.makePublic();
    req.firebaseUrl = file.publicUrl();
    next();
  });
  stream.end(image?.buffer);
};

export { upload };
