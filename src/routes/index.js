const { Router } = require('express');
const express = require('express');
const {db} = require('../firebase');
const bodyParser = require('body-parser');

const router = Router();
router.use(bodyParser.json());

//Leer produtos
router.get('/products', async (req, res) => {
    try {
        const querySnapshot = await db.collection('products').get();
        const products =  querySnapshot.docs.map( doc => ({
        id: doc.id,
        nombre_p: doc.data().nombre_p,
        marca_p: doc.data().marca_p,
        entrada: doc.data().entrada,
        salida: doc.data().salida,
        almacenar: doc.data().almacenar,
        responsable: doc.data().responsable
    }));

    res.json({products, message:'Aqui estan todos los productos en existencia'}); 

    } catch (error) {
        console.error(error);
        return res.status(400).json(
            {
            error: true,
            message:`Ocurrio un error al procesar la peticion: ${error.message}`
            }
          );
    }
 });

 //Agregar productos
router.post('/new-products', async (req, res) => {
    try {
    const { nombre_p, marca_p, cantidad_p, tipo, almacenar, responsable} = req.body
   //Se envia hacia la BD
    const products = await db.collection('products').add({
    nombre_p, 
    marca_p, 
    responsable
    });
    res.json({products, message: 'El producto fue creado correctamente'});

    } catch (error) {
        console.error(error);
    }
    return res.status(400).json(
        {
        error: true,
        message:`Ocurrio un error al procesar la peticion: ${error.message}`
        }
      );
});

//Editar productos mediante ID
/*router.get('/edit-products/:id', async (req, res) => {

    console.log(req.params.id);

    const doc = await db.collection('products').doc(req.params.id).get()

    console.log({
        id: doc.id,
        nombre_p: doc.data().nombre_p,
        descripcion: doc.data().descripcion,
        marca_p: doc.data().marca_p,
        cantidad_p: doc.data().cantidad_p,
        tipo: doc.data().tipo,
        almacenar: doc.data().almacenar,
        responsable: doc.data().responsable
    });
    res.send('Editar producto');
})*/

//Eliminar producto
router.delete('/delete-products/:id', async (req, res) =>{
    try {
        const ProductId = req.params.id
      const products = await db.collection('products').doc(ProductId).delete();

        res.json({products, message:'Producto eliminado correctamente'});

    } catch (error) {
        console.log(error);
    }
    return res.status(400).json(
        {
        error: true,
        message:`Ocurrio un error al procesar la peticion: ${error.message}`
        }
      );
});

//Actualizar producto por ID 
router.put('/update-products/:id', async (req, res) => {
    try {
        const productsId = req.params.id;
        const { nombre_p, marca_p, responsable } = req.body;
        const product = { nombre_p, marca_p, responsable };

       const products = await db.collection('products').doc(productsId).update(product);
        
        res.json({products, message: 'Usuario actualizado exitosamente' });

    } catch (error) {
        console.log(error);
    }
    return res.status(400).json(
        {
        error: true,
        message:`Ocurrio un error al procesar la peticion: ${error.message}`
        }
      );
});

 module.exports = router;