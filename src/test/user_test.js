let chai = require('chai');
let chaiHttp = require('chai-http');
const { log } = require('console');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:4000';

describe('Usuarios',()=>{
    it('Crear usuarios', (done) => {
        chai.request(url)
        .post('/create-user')
        .send({
            name:"LisaM",
            email:"Ala@gmail.com",
            password:"1234567",
            lastname:"Perez",
            phone:"2441124419",
        })
        .end( function(err,res){
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('email');
            done();
        });
    });
    it("Debe retornar error al registrar un usuario existente",(done)=>{
        chai.request(url)
        .post('/create-user')
        .send({
            name:"Luis",
            email:"lisandra@gmail.com",
            password:"127894",
            lastname:"Perez",
            phone:"2441124419",
        })
        .end((err, res)=>{
            expect(res).to.have.status(400);
            done();
        });
    });
    it("Debe retornar error al faltar campos",(done)=>{
        chai.request(url)
        .post('/create-user')
        .send({
            name:"Luis",
            email:"luisa122@gmail.com",
            phone:"2441124419",
            password:"1234578"
        })
        .end((err, res)=>{
            expect(res).to.have.status(400);
            done();
        })
    } );
});

describe('Actualizar usuarios',()=>{
    it('Debe actualizar el usuario', (done) => {
        chai.request(url)
        .put('/update/8MUTEubWaeTYAfLX2xwh')
        .send({
            name:"Lukh",
            password:"1234567",
            lastname:"Perez",
            phone:"2441124419",
        })
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
    it("Debe retornar error cuando el email no cumpla el requisito ",(done)=>{
        chai.request(url)
        .put('/update/i513LRYR5LSxioBuTnx')
        .send({
            name:"Luis",
            password:"12789",
            email:"Frans1@gmail",
            lastname:"Perez",
            phone:"2441124419",
        })
        .end((err, res)=>{
            expect(res).to.have.status(400);
            done();
        });
    });
    it("Debe retornar error cuando el usuario no exista el usuario",(done)=>{
        chai.request(url)
        .put('/update/i513LRYR54LSxioBuTnx')
        .send({
            name:"Luis",
            email:"luisa122@gmail.com",
            phone:"2441124419",
            password:"1234578"
        })
        .end((err, res)=>{
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('error');
            expect(res.body).to.have.property('message');
            done();
        })
    } );
});

describe('Obtener usuarios',()=>{
    it('Debe obtener todos los usuarios', (done) => {
        chai.request(url)
        .get('/users')
        .end( function(err,res){
            console.log(res.body);
            expect(res).to.have.status(200);
            done();
        });
    });
    it('Debe retornar error cuando el usuario no exista', (done) => {
        chai.request(url)
        .get('/users/13LlYR54LSxioBuTnx')
        .end( function(err,res){
            console.log(res.body);
            expect(res).to.have.status(400);
            done();
        })
    });
    it('Debe retornar error cuando los datos no se encuentren', (done) => {
        chai.request(url)
        .get('/user/M')
        .end( function(err,res){
            expect(res).to.have.status(400);
            done();
        });
        
    });
});


//Y 
describe('Eliminar usuarios',()=>{
    it('Debe eliminar un usuario por ID', (done) => {
        chai.request(url)
        .delete('/delete/yQxKISUIpnwJuXslEn4M')
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
    it('Debe retornar error cuando el ID no exista', (done) => {
        chai.request(url)
        .delete('/delete/i513LRYR54LSxioBuTnx')
        .end( function(err,res){
            expect(res).to.have.status(400);
            done();
        });
    });
    it('Debe retornar error cuando el email no exista', (done) => {
        chai.request(url)
        .delete('/deleteEm/rel@gmail.com')
        .end( function(err,res){
            expect(res).to.have.status(400);
            done();
        });
    });
});