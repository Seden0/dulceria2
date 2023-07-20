require('dotenv').config()

const admin = require("firebase-admin");
const credentials = require('../firebase.json');

const {initializeApp, applicationDefault} = require ('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');

admin.initializeApp({
    credential: admin.credential.cert(credentials),
    databaseURL: "https://pbdc-10963-default-rtdb.firebaseio.com",
});

const db = getFirestore();

module.exports = {
    db,
}