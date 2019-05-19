const Matricula = require("../models/matricula.js.js");
const { ObjectId } = require('mongodb');


module.exports = router => {
  router.get("/matriculas", (req, res) => {
    Matricula.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  })

  router.post("/updateMatricula/:id", (req, res) => {
    const { id, update } = req.body;
    console.log(req.body)
    console.log(id)
    Matricula.findOneAndUpdate({ _id: ObjectId(id)}, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  })

  router.delete("/matricula/:id", (req, res) => {
    const { id } = req.body;
    Matricula.findOneAndDelete( {_id: ObjectId(id)}, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  })

  router.post("/matricula", (req, res) => {
    const matricula = new Matricula();
    const { curso, aluno } = req.body;
    if (!curso || !aluno) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }

    matricula.curso = curso;
    matricula.aluno = aluno
    matricula.save((err, data )=> {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data });
    });
  })
}
