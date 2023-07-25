const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();

const url= 'http://localhost:4000';

describe('Login',()=>{
    it('Debe iniciar sesion un usuario', (done) => {
        chai.request(url)
        .post('/login')
        .send({
            email:"pedrito@gmail.com",
            password:"1234pedro"
        })
        .end( function(err,res){
            res?.should.have.status(200);
            done();
        });
    });
    it('Debe retornar error cuando el usuario exista', (done) => {
        chai.request(url)
        .post('/login')
        .send({
            email:"pedrito@g.com",
            password:"1234pedro"
        })
        .end( function(err,res){
            res?.should.have.status(500);
            done();
        });
    });
    it('Debe retornar error si no cumple los requisitos', (done) => {
        chai.request(url)
        .post('/login')
        .send({
            email:"pedrito@gmail.com",
            password:""
        })
        .end( function(err,res){
            res?.should.have.status(500);
            done();
        });
    });
    it('Debe retornar error cuando el correo no sea valido', (done) => {
        chai.request(url)
        .post('/login')
        .send({
            email:"ema@com",
            password:"123456"
        })
        .end( function(err,res){
            res?.should.have.status(500);
            done();
        });
    });
});