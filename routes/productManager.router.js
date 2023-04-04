import { Router, json } from "express";
import ProductManager from "../app/productManager.js";

const productManagerRouter = Router();
productManagerRouter.use(json());

const item = new ProductManager();

productManagerRouter.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const prods = await item.getProducts();
    if (!limit) {
      res.send(prods);
    } else {
      //envia el filtrado de el numero de datos
      const filtered = await prods.splice(0, limit);
      res.send(filtered);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

//segun el id
productManagerRouter.get("/:id", async (req, res) => {
  try {
    const prodId = Number(req.params.id);
    const log = console.log(prodId);
    const result = await item.getProductById(prodId);
    return res.send(result);
  } catch (err) {
    res.status(404).send({error: `${err}`})
  }
});

//post carga de info code, no llega la info por body, llega por query
productManagerRouter.post("/", async (req, res) => {
  try {
    const code = req.body.code;
    const title = req.body.title;
    const description = req.body.description;
    const price = Number(req.body.price);
    const thumbnail = req.body.thumbnail;
    const stock = Number(req.body.stock);
    const status = req.body.status;
    const category = req.body.category;
    const test = console.log(
      code + title + description + price + thumbnail + stock + status + category
    );
    const result = await item.addProduct(
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
      status,
      category
    );
    res.send(result);
  } catch (err) {
    res.status(404).send({error: `${err}`})
  }
});

productManagerRouter.put("/", async (req, res) => {
  try {
    const prodIdUp = Number(req.body.prodIdUp);
    const value = req.body.value;
    const data = req.body.data;
    const result = await item.updateProdById(prodIdUp, value, data);
    res.send(result);
  } catch (err) {
    res.status(404).send({error: `${err}`})
  }
});

productManagerRouter.delete("/:id", async (req, res) => {
  try {
    const prodId = Number(req.params.id);
    const result = await item.deleteProdById(prodId);
    res.send(result);
  } catch (err) {
    res.status(404).send({error: `${err}`})
  }
});

export default productManagerRouter;
