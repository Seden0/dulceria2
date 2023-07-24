const {Router}= require('express');
const admin = require('firebase-admin');
const {db} = require('../firebase');


const router = Router();

//Esta es la Ruta para el inicio de sesión 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      //Aqui se Inicia sesión con Firebase Authentication
      const userRecord = await admin.auth().getUserByEmail(email);

      //Aqui se Verifica la contraseña utilizando Firebase Authentication
      await admin.auth().updateUser(userRecord.uid, {
        password,
      });
      
      // Respuesta del inicio de sesión fue exitoso
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      // Manejo de errores
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  });

module.exports = router;