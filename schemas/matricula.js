const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MatriculaSchema = new Schema(
  {
    curso: { type: Schema.Types.ObjectId, ref: "Curso"},
    aluno: { type: Schema.Types.ObjectId, ref: "Aluno" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Matricula", MatriculaSchema);
