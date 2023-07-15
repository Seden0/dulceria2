require('dotenv').config()

const firebase = require('firebase');
const bodyParser = require('body-parser');
const { app } = require('firebase-admin');

const app = express();
app.use(bodyParser.json());


// Inicializar la aplicación de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAwD1v6WR8wcLEoSD8PiDPnE_kO2z4yr04",
    authDomain: "pbdc-10963.firebaseapp.com",
    projectId: "pbdc-10963",
  };
  
  firebase.initializeApp(firebaseConfig);

  module.exports = app;