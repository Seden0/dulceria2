const {Router}= require('express');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const firebase = require('../firebase');

const router = Router();

 // Configurar el transportador de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otros servicios de correo electrónico o configurar uno propio
  auth: {
    user: 'carlos.enrique.3em@gmail.com',
    pass: 'nehgkbnokhxnkcje'
  }
});

// Ruta para enviar el correo de recuperación de contraseña
router.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el correo está registrado en Firebase
    const userRecord = await admin.auth().getUserByEmail(email);

    // Generar token de restablecimiento de contraseña
    const resetToken = await admin.auth().generatePasswordResetLink(email);

    // Enviar el correo de restablecimiento de contraseña
    await transporter.sendMail({
      from: 'carlos.enrique.3em@gmail.com',
      to: email,
      subject: 'Recuperación de contraseña',
      text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetToken}`,
    });

    res.status(200).json({ message: 'Correo enviado con éxito' });

    console.log();
  } catch (error) {
    return res.status(404).json({ error: 'Correo no registrado' });
  }
});

module.exports = router;