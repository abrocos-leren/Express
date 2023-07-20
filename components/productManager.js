import {promises as fs} from "fs"

export default class productManager {
    constructor() {
        this.patch = './productos.txt'
        this. products = []

    }
    static id = 0

    addProduct = async (title, description, price, image, code, stock) => {
        productManager.id++

        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id: productManager.id
        }
        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    
    }
    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, 'utf-8')
        return JSON.parse(respuesta)
    }
    getProducts = async () => {
        let res = await this.readProducts()
       return console.log(res);
        
    }

    getProductById = async (id) => {
        let res = await this.readProducts()
        if(!res.find(products => products.id === id)) {
            console.log('Producto no encontrado')
        } else{
            console.log(res.find(products => products.id === id))
        }
        

    }

    deleteProductById = async (id) => {
        let res = await this.readProducts()
        let filter = res.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(filter))
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductById(id)
        let productOld = await this.readProducts()
        let productsMods = [
            {...producto, id},
            ...productOld
        ]
        await fs.writeFile(this.patch, JSON.stringify(productsMods))
        console.log(productsMods);
    }
}

// const productos = new productManager

// productos.addProduct('Titulo1', 'Remera', '100', 'imagen.jpg', '1', '5')
// productos.addProduct('Titulo2', 'Remera2', '200', 'imagen2.jpg', '2', '10')
// productos.addProduct('Titulo3', 'Remera3', '300', 'imagen3.jpg', '3', '15')
// productos.addProduct('Titulo4', 'Remera4', '400', 'imagen4.jpg', '4', '20')
// productos.addProduct('Titulo5', 'Remera5', '500', 'imagen5.jpg', '5', '25')

// //todos los productos
// productos.getProducts()

// //Por ID
// productos.getProductById(6)

// // Eliminar producto por ID
// productos.deleteProductById()

// actualizar producto
// productos.updateProducts({
//     title: 'Titulo2',
//     description: 'Remera2',
//     price: '500',
//     image: 'imagen2.jpg',
//     code: '2',
//     stock: '10',
//     id: 2
// })