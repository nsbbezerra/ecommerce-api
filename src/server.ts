import express from "express";

const app = express();

app.use(express.json());

app.listen(4003, () => {
  console.log("Server is running on PORT 4003");
});
