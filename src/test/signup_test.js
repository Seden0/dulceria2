let chai = require('chai');
let chaiHttp = require('chai-http');
const { log } = require('console');
const expect = require('chai').expect;

chai.use(chaiHttp);
chai.should();
const url= 'http://localhost:4000';

//Y 
describe('Signup',()=>{
    it('Debe registrar un nuevo usuario', (done) => {
        chai.request(url)
        .post('/signup')
        .send({
            email:"234@g.com",
            password:"123456"
        })
        .end( function(err,res){
            res?.should.have.status(200);
            done();
        });
    });
    it('Debe retornar error cuando el usuario exista', (done) => {
        chai.request(url)
        .post('/signup')
        .send({
            email:"emma@g.com",
            password:"123456"
        })
        .end( function(err,res){
            res?.should.have.status(500);
            done();
        });
    });
    it('Debe retornar error cuando la contraseña no cumpla los requisitos', (done) => {
        chai.request(url)
        .post('/signup')
        .send({
            email:"ema@g.com",
            password:"1256"
        })
        .end( function(err,res){
            res?.should.have.status(500);
            done();
        });
    });
    it('Debe retornar error cuando el correo no sea valido', (done) => {
        chai.request(url)
        .post('/signup')
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