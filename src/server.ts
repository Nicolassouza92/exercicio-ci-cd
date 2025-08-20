import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("*******************************************");
  console.log(`🔰 Servidor rodando na porta ${process.env.PORT}!`);
  console.log(`   Servidor local: http://localhost:${process.env.PORT}`);
  console.log("*******************************************");
});
