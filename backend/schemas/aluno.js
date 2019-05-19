// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlunoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    matriculas: [{ type: Schema.Types.ObjectId, ref: "Matricula" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Aluno", AlunoSchema);
