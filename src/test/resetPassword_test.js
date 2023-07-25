const chai = require('chai');
const chaiHttp = require('chai-http');
const admin = require('firebase-admin');
const firebase = require('../firebase');
const expect = require('chai').expect;
const resetPassword  = require('../routes/resetPassword'); 

chai.use(chaiHttp);
chai.should();
const url= 'http://localhost:4000';

describe('Recuperación de contraseña', () => {
  it('Debe devolver un mensaje de éxito si el correo está registrado', (done) => {
    chai.request(url)
      .post('/reset-password')
      .send({ email: 'carlos@gmail.com' })
      .end((err, res) => {
        res?.should.have.status(200);
        res?.body.should.have.property('message').eql('Correo enviado con éxito');
        done();
      });
  });

  it('Debe devolver un error si el correo no está registrado', (done) => {
    chai.request(url)
      .post('/reset-password')
      .send({ email: 'luis@gmail.com' })
      .end((err, res) => {
        res?.should.have.status(404);
        res?.body.should.have.property('error').eql('Correo no registrado');
        done();
      });
  });
  it('Debe retornar error cuando el correo no sea valido', (done) => {
    chai.request(url)
    .post('/reset-password')
    .send({
        email:"ema@com",
        password:"123456"
    })
    .end( function(err,res){
        res?.should.have.status(404);
        done();
    });
});
});
  