const fs = require('fs');
const util = require('util');

class ProductManager {
    constructor(productos) {
        this.productos = productos;
    }

async getProducts() {
        try {
            const products = await this.readProducts();
            return products;
        }
        catch (error) {
            throw new error ("getProducts - Error");
        }
   }


    async addProduct(nombre, descripcion, precio, img, code, stock) {
        try {
            const productos = await this.readProducts();
            const producto_id = productos.length > 0 ? productos[productos.length - 1].id : 0;
            const nuevoProducto_id = producto_id + 1;
            const producto = {
                id: nuevoProducto_id,
                nombre,
                descripcion,
                precio,
                img,
                code,
                stock
            };
            productos.push(producto);
            await this.writeProducts(productos);
            return nuevoProducto_id;
        } catch (error) {
            console.error("Error en addProduct:", error);
            throw new Error("addProduct - Error");
        }
    }
    
    async getById (producto_id){
        try{
        const productos = await this.readProducts();
        const producto_existe = productos.find(producto => producto.id === producto_id);
        if(!producto_existe) {
            
            console.log ( "getByid - Producto no existe");
            return;
        } else {
            console.log ("getByid - Producto existente y es", producto_existe);
            return producto_existe; 
        }
    }
    catch (error) {
        throw new Error ("getById - Error");
    }
    }

    async updateProduct(producto_id, nombre, descripcion, precio, img, code, stock) {
        try{
        const productos = await this.readProducts();
        const producto_existe = productos.find(producto => producto.id === producto_id);
        if(!producto_existe) {
            console.log ("updateProduct - Producto no existe");
            return;
        } else {
            producto_existe.nombre = nombre;
            producto_existe.descripcion = descripcion;
            producto_existe.precio = precio;
            producto_existe.img = img;
            producto_existe.code = code;
            producto_existe.stock = stock;
            await this.writeProducts(productos)
        }
    }
    catch (error) {
        throw new Error ("updateProduct- Error");
    }
}
async deleteProductById(producto_id) {
    try{
        
        let productos = await this.readProducts();
        const dontDelete = parseInt(producto_id); 
        const productosFiltrados = productos.filter(producto => producto.id !== dontDelete);
        await this.writeProducts(productosFiltrados);
    }
    catch (error) {
        throw new Error ("deleteProductById -Error");
    }    
}
async readProducts() {
    try {
        const readFileAsync = util.promisify(fs.readFile);
        const productos = await readFileAsync('archivo.txt', 'utf8');
        return productos ? JSON.parse(productos) : [];
    } catch (error) {
        console.error("Error en readProducts:", error);
        throw new Error("readProducts - Error");
    }
}
async writeProducts(productos) {
    try {
        const jsonArray = JSON.stringify(productos, null, 2);
        await fs.promises.writeFile('archivo.txt', jsonArray);
    } catch (error) {
        console.error("Error en writeProducts:", error);
        throw new Error("writeProducts - Error");
    }
}

}
module.exports = {
    ProductManager,
  };


// const prueba = async () => {
//     const productos = new ProductManager("archivo.txt");
//     await productos.addProduct("Producto1", "Descripcion1", 101, "img1", "a1", 11)

//     const getId= await productos.getById(1);
//     const update = await productos.updateProduct(2, "ProductoUpdate", "DescripcionUpdate", 102, "imgUpdate", "aUpdate", 12)
//     const deleteId = await productos.deleteProductById(1)
//     const mostrarProductos = await productos.getProducts();
//     console.log ("muestro productos" ,mostrarProductos);
// }

// prueba();


