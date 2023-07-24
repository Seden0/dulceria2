const {Router}= require('express');
const admin = require('firebase-admin');

const router = Router();

// Ruta para el registro
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
      //Aqui se Crea el usuario en Firebase Authentication
      const userRecord = await admin.auth().createUser({
        email,
        password,
      });
      // Envía una respuesta con los detalles del usuario creado
      res.status(200).json({ message: 'Usuario creado exitosamente', user: userRecord });
    } catch (error) {
      //Aqui podremos ver los Manejos de errores
      res.status(500).json({ error: 'Error al crear el usuario', details: error.message });
    }
  });

module.exports = router;