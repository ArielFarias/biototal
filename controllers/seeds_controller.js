const Curso = require("../models/curso");
const Aluno = require("../models/aluno");
const Matricula = require("../models/matricula");

exports.initSeeds = (req, res) => {
  const portugues = new Curso({
    id: 1,
    titulo: 'Portugues'
  });

  const biologia = new Curso({
    id: 2,
    titulo: 'Biologia'
  });

  const ariel = new Aluno({
    nome: "Ariel",
    email: "eu.ariel.farias@gmail.com",
  });

  const matricula1 = new Matricula()

  matricula1.aluno = ariel._id;
  matricula1.curso = portugues._id;
  matricula1.save(err => {
    if(err) return console.log(err.stack);
    console.log("Matricula Criada");
  });

  const matricula2 = new Matricula()
  
  matricula2.aluno = ariel._id;
  matricula2.curso = biologia._id;
  matricula2.save(err => {
    if(err) return console.log(err.stack);
    console.log("Matricula Criada");
  });

  portugues.matriculas.push(matricula1._id)
  portugues.save(err => {
   if(err) return console.error(err.stack)
   console.log("Portugues Criada")
  });

  biologia.matriculas.push(matricula2._id)
  biologia.save(err => {
    if(err) return console.error(err.stack);
    console.log("Biologia Criada")
  })

  ariel.matriculas.push(matricula1._id, matricula2._id)

  ariel.save(err => {
    if(err) return console.log(err.stack);
    console.log("Aluno Criado");
  });

  // Return Message
  res.send("Done Initial Data!");
}
