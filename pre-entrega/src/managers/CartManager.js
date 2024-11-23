import { generateId } from "../utils/collectionHandler.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from "../utils/paths.js";
import ErrorManager from "./ErrorManager.js";
import ProductManager from "./ProductManager.js";

export default class CartManager{
    #jsonFilename;
    #carts;

    constructor(){
        this.#jsonFilename= "carts.json";
    }

    async $findOneById(id){
        this.#carts = await this.getAll();
        const cartFound= this.#carts.find((item)=> item.id === Number(id));

        if (!cartFound) {
            throw new ErrorManager("Id no encontrado", 404);
        }
        return cartFound;
    }

    async getAll(){
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
    async getOneById(id){
        try {
            const cartFound= await this.$findOneById(id);
            return cartFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    async insertOne(data){
        try {
            const productManager = new ProductManager();
            const products = await Promise.all(
                data?.products?.map(async (item) => {
                    await productManager.getOneById(Number(item.product));
                    return { product: Number(item.product), quantity: 1 };
                }) || [],
            );

            const cart={
                id: generateId(await this.getAll()),
                products: products || [],
            };

            this.#carts.push(cart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    addOneProduct = async (id, productId) => {
        try {
            console.log("Iniciando la adición del producto al carrito", id, productId);
            const productManager = new ProductManager();
            await productManager.getOneById(productId);

            const cartFound = await this.$findOneById(id);
            const productIndex = cartFound.products.findIndex((item) => item.product === Number(productId));

            if (productIndex >= 0) {
                cartFound.products[productIndex].quantity++;
            } else {
                cartFound.products.push({ product: Number(productId), quantity: 1 });
            }

            const index = this.#carts.findIndex((item) => item.id === Number(id));
            this.#carts[index] = cartFound;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return cartFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}