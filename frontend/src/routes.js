import Alunos from "views/Alunos.jsx"
import Cursos from "views/Cursos.jsx"
import Matriculas from "views/Matriculas.jsx"

var routes = [
  {
    path: "/alunos",
    name: "Alunos",
    icon:  "tim-icons icon-single-02",
    component: Alunos,
    layout: "/admin"
  },
  {
    path: "/cursos",
    name: "Cursos",
    icon:  "tim-icons icon-atom",
    component: Cursos,
    layout: "/admin"
  },
  {
    path: "/matriculas",
    name: "Matriculas",
    icon:  "tim-icons icon-paper",
    component: Matriculas,
    layout: "/admin"
  }
];
export default routes;
