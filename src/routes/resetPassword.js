const {Router}= require('express');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

const router = Router();

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'carlos.enrique.3em@gmail.com',
    pass: ''
  }
});

const email = 'carlos@gmail.com';

admin.auth().generatePasswordResetLink(email)
  .then((link) => {
    // Configuración del mensaje de correo electrónico
    const mailOptions = {
      from: 'carlos.enrique.3em@gmail.com',
      to: email,
      subject: 'Restablecimiento de contraseña',
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${link}`
    };

    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });
  })
  .catch((error) => {
    console.error('Error al generar el enlace de restablecimiento de contraseña:', error);
  });

module.exports = router;