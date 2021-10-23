import app from "./src/server";
import dotenv from "dotenv";
import 'reflect-metadata';
import { setupConnection } from "/Users/lucas.moreira/Documents/Puc/AulaEvolucao/api/src/db/config"

dotenv.config();

setupConnection();
const port = process.env.PORT;

app.listen(port, () =>
  console.log(`This beautiful and updated server is running on port ${port}`)
);
