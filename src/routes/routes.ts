import { Router, Request, Response } from "express";
import Express from "express";
import path from "path";
import { tarefas } from "../repositories.ts/tasks";

const router = Router();
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

// ----- ROTAS ------
router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../public", "index.html"));
});

router.get("/todo", (req: Request, res: Response) => {
  try {
    // SIMULANDO UMA CONSULTA NO BANCO DE DADOS
    const resultado = tarefas;

    // RESPOSTA COM OS DADOS
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send({ erro: error });
  }
});

router.post("/todo", (req: Request, res: Response) => {
  try {
    if (!req.body?.tarefa) {
      throw "formato de requisição incorreto :(";
    }
    const tarefa = req.body.tarefa;

    // SIMULAÇÃO UMA INSERÇÃO NO BANCO DE DADOS
    // novoId é 1 se o banco está vazio, ou 1 a mais que o ID da última tarefa do banco
    const novoId = (tarefas[tarefas.length - 1]?.id || 0) + 1;
    tarefas.push({ id: novoId, descricao: `${tarefa}` });

    // RESPOSTA COM STATUS 200
    res.status(200).send({
      id: novoId,
      mensagem: `Tarefa '${tarefa}' inserida com sucesso!`,
    });
  } catch (error) {
    res.status(400).send({ erro: error });
  }
});

router.delete("/todo/:id", (req: Request, res: Response) => {
  try {
    if (!req.params?.id) {
      throw "Requisição sem ID";
    }
    const idParaDeletar = Number(req.params.id);

    // -1 se não encontrou
    const index = tarefas.findIndex((tarefa) => tarefa.id === idParaDeletar);

    if (index === -1) {
      res.status(404).send({ mensagem: `ID não encontrado!` });
      return;
    }

    // deletar no banco (splice) e mandar status 200
    const tarefa = tarefas[index];
    tarefas.splice(index, 1);
    res.status(200).send({
      mensagem: `Tarefa '${tarefa.descricao}' deletada com sucesso!`,
    });
  } catch (error) {
    res.status(400).send({ erro: error });
  }
});

export { router };
