// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CursoSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descricao: String,
    matriculas: [{ type: Schema.Types.ObjectId, ref: "Matricula "}]
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Curso", CursoSchema);
