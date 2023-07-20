import express from 'express'
import productManager from '../components/productManager.js'

const app = express()
app.use(express.urlencoded({extended: true}))
const PORT = 8080

const obj = {
    "nombre": 'Agustin',
    "apellido": 'Brocos',
    "edad" : 24
}





app.get('/', (req, res) => {
res.send('<h1 style="color:blue;">Bienvenido</h1>')
})

app.get('/usuario', (req, res) => {
    res.send(obj)
})


const productos = new productManager()
const readProducts = productos.readProducts()
// console.log(await readProducts)
app.get('/products', async (req, res) => {
    
    let limit = parseInt(req.query.limit)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    if(limit) {
        res.send(await productLimit)
    } else {
        res.send(allProducts)
    }
    
})

app.get('/products/:id', async (req, res) => {
    
    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productById = allProducts.find(product => product.id === id)
    res.send(productById)
})



app.listen(PORT, ()=> {
    console.log(`Server running at ${PORT}`);
})
