
const fs = require('fs');
const util = require('util');
const { ProductManager } = require('./productos.js');
const express = require('express');

const app = express ()
const port = 8080
app.use (express.json())
app.use (express.urlencoded({extended: true}))

        app.get('/productos', async (req, res) => {
            const limit = parseInt(req.query.limit)
        
            const mostrarProductos = async () => {
                const productos = new ProductManager("archivo.txt")
                const listaProductos = await productos.getProducts()
                const cantidad = listaProductos.length;
        
                if (isNaN(limit)) {
                   
                    res.json(listaProductos)   
                } 
                else if (( limit >0 && limit < cantidad)) {
                    res.json(listaProductos.slice(0, limit))
                }
                else{
                    res.send ("no hay esa cantidad de productos")
                }
               
            };
        
            mostrarProductos();
        });

        app.get ('/productos/:id', async (req, res) => {
            const id = parseInt(req.params.id)
            const producto = new ProductManager("archivo.txt")
            const producto_existe = await producto.getById(id)

            if (!producto_existe) {
                res.status(404).json({ message: "Producto no encontrado" });
            } else {
                res.send(producto_existe);
            }
            
        })
        

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


