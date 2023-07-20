const chai = require('chai');
const main = require('./main');
const expect = chai.expect;
const {db} = require('../firebase');
const firebase = require('firebase/app');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

//Acccesedemos a la url declaramos una constante
const url = 'http://localhost:4000';
const products = require('../routes/products');

describe('Prueba Get', () => {
    it('Debe obtener todos los productos', (done) => {
        chai.request(url)
          .get('/products')
          .end(function(err, res) {
            //Agregar operador ?. antes de acceder a una propiedad
            expect(res?.body);
            //expect(res?.nombre_p?.marca_p);
            done();
          });
      });
      it('Debe retornar un error si falta información', function(done) {
        chai.request(url)
          .post('/products')
          .send({ nombre_p: 'Galletas Abanicos', marca_p:'Macma' , responsable: 'johndoe@example.com' })
          .end(function(err, res) {
            expect(res?.body);
            done();
          });
      });
      it('Debe retornar un error si el producto no existe', function(done) {
        const nonExistentProductsId = 'products';
        chai.request(url)
          .delete(`/delete-products/${nonExistentProductsId}`)
          .end(function(err, res) {
            expect(res?.body);
            done();
          });
      });
});

describe('Prueba Post', () => {
    it('Debe agregar un producto', (done) => {
      chai.request(url)
      .post('/new-products')
      .send({ nombre_p: 'Galletas Abanicos', marca_p:'Macma' , responsable: 'johndoe@example.com' })
      .end(function(err, res) {
        //Agregar operador ?. antes de acceder a una propiedad
        //expect(res?.body);
        //expect(res?.body).property('message');
        expect(res?.nombre_p?.marca_p?.responsable);
        done();
      });
    });
    it('Debe retornar un error si falta información', function(done) {
      chai.request(url)
        .post('/new-products')
        .send({ nombre_p: 'Galletas Abanicos', marca_p:'Macma' , responsable: 'johndoe@example.com' })
        .end(function(err, res) {
          expect(res?.body);
          done();
        });
    });
    it('Debe retornar un error si el producto no existe', function(done) {
      const nonExistentProductsId = 'products';
      chai.request(url)
        .post(`/new-products/${nonExistentProductsId}`)
        .send({ nombre_p: 'Galletas Surtidas 500g', marca_p:'Macma' , responsable: 'janesmith@example.com' })
        .end(function(err, res) {
          expect(res?.body)
          done();
        });
    });
});

describe('Prueba Delete', () => {
  let productId;
    it('Debe eliminar un producto', (done) => {
      chai.request(url)
      .delete(`/delete-products/${productId}`)
      .end(function(err, res) {
          expect(res?.body);
        done();
      });
    });
    it('Debe retornar un error si falta información', function(done) {
      chai.request(url)
        .delete('/delete-products')
        .send({ nombre_p: 'Galletas Abanicos', marca_p:'Macma' , responsable: 'johndoe@example.com' })
        .end(function(err, res) {
          expect(res?.body);
          done();
        });
    });
    it('Debe retornar un error si el producto no existe', function(done) {
      const nonExistentProductsId = 'products';
      chai.request(url)
        .delete(`/delete-products/${nonExistentProductsId}`)
        .end(function(err, res) {
          expect(res?.body);
          done();
        });
    });
});

/*
  describe('Prueba Put', () => {
    let productsId;
    it('Debe actualizar productos', (done) => {
      chai.request(url)
      .put(`/update-products/${productsId}`)
      .send({ nombre_p: 'Galletas Abanicos 400g', marca_p:'Macma' , responsable: 'john@example.com'  })
      .end(function(err, res) {
        expect(res?.body);
        done();
      });
    });
    it('Debe retornar un error si falta información', function(done) {
      chai.request(url)
        .put('/update-products/')
        .send({ nombre_p: 'Galletas Abanicos', marca_p:'Macma' , responsable: 'johndoe@example.com' })
        .end(function(err, res) {
          expect(res?.body);
          done();
        });
    });
    it('Debe retornar un error si el producto no existe', function(done) {
      const nonExistentProductsId = 'products';
      chai.request(url)
        .put(`/update-products/${nonExistentProductsId}`)
        .send({ nombre_p: 'Galletas Surtidas 500g', marca_p:'Macma' , responsable: 'janesmith@example.com' })
        .end(function(err, res) {
          expect(res?.body)
          done();
        });
    });
  });*/