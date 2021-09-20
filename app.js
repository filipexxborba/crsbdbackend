import express from "express";
import mongoose from "mongoose";

const password = "crscontroller";

const DB_URL = `mongodb+srv://admin:${password}@cluster0.s3mae.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(DB_URL);
const db = mongoose.connection;

db.once("open", () => {
  console.log("Conexão com o banco efetuada com sucesso");
});

const server = express();
const port = 9995;
server.use(express.json());

const crsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  titulo: String,
  nucleo: String,
  descricao: String,
  codigoCrs: Number,
  responsavel: String,
  date: Date,
  status: Boolean,
  observacoes: Array,
});

const CrsItem = mongoose.model("CRS", crsSchema);

server.get("/", (req, res) => {
  let response = JSON.stringify({
    "api-version": "v1",
    descricao: "API utilizado para o backend do CRS Controller",
  });
  res.send(response).status(200);
});

server.post("/v1/createNewCRS", (req, res) => {
  const id = new mongoose.Types.ObjectId();
  const data = {
      titulo: req.body.titulo,
      descricao: req.body.descricao,
      responsavel: req.body.responsavel,
      numeroCRS: req.body.numeroCRS,
      nucleo: req.body.nucleo,
      status: false,
  }

  res.send(data).status(200);
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
