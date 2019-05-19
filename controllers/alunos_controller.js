const Aluno = require("../models/aluno");
const { ObjectId } = require('mongodb');

module.exports = router => {
  router.get("/alunos", (req, res) => {
    Aluno.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  })

  router.post("/updateAluno/:id", (req, res) => {
    const { id, update } = req.body;
    Aluno.findOneAndUpdate({ _id: ObjectId(id)}, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  })

  router.delete("/aluno/:id", (req, res) => {
    const { id } = req.body;
    Aluno.findOneAndDelete({ _id: ObjectId(id)}, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  })

  router.post("/aluno", (req, res) => {
    let aluno = new Aluno();
    const { id, nome, email, date } = req.body;
    if (!nome || !email || !date) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    aluno.nome = nome;
    aluno.email = email;
    aluno.date = date;
    aluno.save((err, data )=> {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data });
    });
  })
}
