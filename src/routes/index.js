const { Router } = require('express');
<<<<<<< HEAD
const {db} = require('../firebase');
const { clientSecret } = require('firebase-tools/lib/api');

const router = Router();

//Leer produtos
router.get('/products', async (req, res) => {
    const querySnapshot = await db.collection('products').get();
    const products =  querySnapshot.docs.map( doc => ({
     id: doc.id,
     nombre_p: doc.data().nombre_p,
     marca_p: doc.data().marca_p,
     entrada: doc.data().entrada,
     salida: doc.data().salida,
     almacenar: doc.data().almacenar,
     responsable: doc.data().responsable
    }))
 
    console.log(products);
     res.send(products)
 })

 //Agregar productos
router.post('/new-products', async (req, res) => {
    const { nombre_p, marca_p, cantidad_p, tipo, almacenar, responsable} = req.body
   //Se envia hacia la BD
    await db.collection('products').add({
    nombre_p, 
    marca_p, 
    responsable
    })
    //De vuelvo cliente
    res.send('Se agrego nuevo producto');
    
})

//Editar productos mediante ID
router.get('/edit-products/:id', async (req, res) => {
=======
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
>>>>>>> 58e0f1be50c94e2f3d8c07ab603504ca9a103f00

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
<<<<<<< HEAD
})

//Eliminar producto
router.delete('/delete-products/:id', async (req, res) =>{
    await db.collection('products').doc(req.params.id).delete()
    res.send('Producto eliminado');
})

//Actualizar producto por ID 
router.put('/update-products/:id', async (req, res) => {
    
    const {id} = req.params;

   await db.collection('products').doc(id).update(req.body)

    res.send('Producto actualizado');
})
=======
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
>>>>>>> 58e0f1be50c94e2f3d8c07ab603504ca9a103f00

 module.exports = router;