import express from "express";
import productManagerRouter from "../routes/productManager.router.js";
import cartManagerRouter from "../routes/cartManager.router.js"


const app = express();
app.use(express.json());

app.use("/api/products", productManagerRouter);
//cart route
app.use("/api/carts", cartManagerRouter)
//escucha
app.listen(8080, () => {
console.log("listening 8080");
})

