const products = require('../models/products');

//Crear un nuevo producto.
const createProduct = (req) => {
    products.push({
        "name": req.name,
        "price": req.price
    }) 
    return { msg: "Product created and added to products list." }
}

//Retorna array con productos existentes.
const getProducts = () => {
    return { products }
}

//Eliminar un producto tomando el ID desde un listado del front end.
const deleteProduct = (req) => {
    const indexFront = parseInt(req - 1)
    products.splice(indexFront, 1)
    return { msg: "Product deleted." }
}

//Editar producto existente tomando el ID desde un listado del front end.
const editProduct = (id, body) => {
     const indexFront = parseInt(id - 1)
    products[indexFront].name = body.name;
    products[indexFront].price = body.price;
    return { msg: "Product updated." }
}


module.exports = { createProduct, getProducts, deleteProduct, editProduct }