import express from "express";
import paths from "./utils/paths.js";

import routerProducts from "./routes/products.router.js";
import routerCarts from "./routes/carts.router.js";

const PORT = 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/public", express.static(paths.public));

app.use("/api/products", routerProducts);
app.use("/api/carts", routerCarts);

app.listen(PORT, ()=>{
    console.log(`Ejecutandose en  http://localhost:${PORT}`);
});