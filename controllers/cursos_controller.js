const Curso = require("../models/curso");
const { ObjectId } = require('mongodb');

module.exports = router => {
  router.get("/cursos", (req, res) => {
    Curso.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  })

  router.post("/updateCurso/:id", (req, res) => {
    const { id, update } = req.body;
    Curso.findOneAndUpdate({ _id: ObjectId(id)}, update, err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

  router.delete("/curso/:id", (req, res) => {
    const { id } = req.body;
    Curso.findOneAndDelete({ _id: ObjectId(id)}, err => {
      if (err) return res.send(err);
      return res.json({ success: true });
    });
  })

  router.post("/curso", (req, res) => {
    const curso = new Curso();
    const { titulo, descricao } = req.body;
    if (!titulo || !descricao) {
      return res.json({
        success: false,
        error: "INVALID INPUTS"
      });
    }
    curso.titulo = titulo;
    curso.descricao = descricao
    curso.save((err, data )=> {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data });
    });
  })
}
