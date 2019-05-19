const Aluno = require('../backend/schemas/aluno.js');
const Curso = require('../backend/schemas/curso.js');
const Matricula = require('../backend/schemas/matricula.js');

const { ObjectID } = require('mongodb');

const alunoId = new ObjectID();
const alunoData = {
  _id: userId,
  nome: "Ariel",
  email: "arielfarias@email.com",
};

const cursoId = new ObjectID();
const cursoData = {
  _id: cursoId,
  titulo: 'biologia',
  descricao: 'Curso de Biologia',
}

const serviceId = new ObjectID();
const serviceData = {
  _id: serviceId,
  name: 'service_001',
  password: '123456'
}

const createDefaultUser = (done) => {
  User.remove({}).then(() => {
    const user = new User(userData);
    return user.save();
  }).then(() => done());
};

const createDefaultDevice = (done) => {
  Device.remove({}).then(() => {
    const device = new Device(deviceData);
    return device.save();
  }).then(() => done());
};

const createDefaultService = (done) => {
  Service.remove({}).then(() => {
    const service = new Service(serviceData);
    return service.save();
  }).then(() => done());
};

module.exports = { createDefaultUser, createDefaultDevice,
  createDefaultService, userData, deviceData, serviceData };
