import React from "react";
import axios from "axios";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Row,
  Col
} from "reactstrap";

class Cursos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descricao: "",
      titulo: "",
      intervalIsSet: false,
      visible: true,
      cursos: []
    };
  }

  componentDidMount() {
    this.getCurso();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getCurso(), 20000);
      this.setState({ intervalIsSet: interval });
    }
  }

  getCurso = () => {
    fetch("http://localhost:3001/api/cursos")
    .then(data => data.json())
    .then(res => this.setState({ cursos: res.data }));
  };
  
    createCurso = () => {
      axios.post("http://localhost:3001/api/curso", {
        titulo: this.state.titulo,
        descricao: this.state.descricao
      }).then(() => this.getCurso());
    };

  editCurso = (e, id, key) => {
    const valor = e.target.value;
    this.setState(prevState => ({
      cursos: prevState.cursos.map(curso => (
        curso._id === id ? {...curso, [key]: valor} : curso)
      )
    }))
  }

  updateCurso = id => {
    const updatedCurso = this.state.cursos.find(curso => curso._id === id);
    axios.post(`http://localhost:3001/api/updateCurso/${id}`, {
      id,
      update: {
        titulo: updatedCurso.titulo,
        descricao: updatedCurso.descricao
      }
    }).then(() => this.getCurso());
  };

  deleteCurso = id => {
    axios.delete(`http://localhost:3001/api/curso/${id}`, {
      data: {
        id
      }
    }).then(() => this.getCurso())
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  render() {
    const iconStyle = {
      margin: '2px'
    };

    return (
      <>
      <div className="content">
        <h3>
          Cursos
        </h3>
          <div>
            <Form>
              <Row>
              <Col xs={12} />
                <Col xs={3}>
                  <FormGroup>
                    <Label for="formTitulo">Titulo</Label>
                    <Input
                      type="text-field"
                      name="titulo"
                      id="formTitulo"
                      placeholder="Título"
                      value={this.state.titulo}
                      onChange={e => this.setState({ titulo: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="formDescricao">Descrição</Label>
                    <Input
                      type="text-field"
                      name="descricao"
                      id="formDescricao"
                      placeholder="Descrição"
                      value={this.state.descricao}
                      onChange={e => this.setState({ descricao: e.target.value })}
                    />
                  </FormGroup>
                  <Button
                    color="success"
                    onClick={this.createCurso}
                  >
                    Criar
                  </Button>
                </Col>
                <Col xs={9}>
                    <Card>
                      <CardBody>
                        <Table>
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th>Titulo</th>
                              <th>Descrição</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.cursos.map((curso, index) => (
                              <tr key={curso._id}>
                                <td className="text-center">
                                  {index + 1}
                                </td>
                                <td>
                                  <Input
                                    type="text-field"
                                    name="titulo"
                                    placeholder="Titulo"
                                    value={curso.titulo}
                                    onChange={e => this.editCurso(e, curso._id, "titulo")}
                                  />
                                </td>
                                <td>
                                  <Input
                                    type="text-field"
                                    name="descricao"
                                    placeholder="Descricao"
                                    value={curso.descricao}
                                    onChange={e => this.editCurso(e, curso._id, "descricao")}
                                  />
                                </td>
                                <td />
                                <td className="text-right">
                                  <Button
                                    color="success"
                                    size="sm"
                                    onClick={() => this.updateCurso(curso._id)}
                                  >
                                  <i style={iconStyle} className="tim-icons icon-pencil"></i>
                                  </Button>{` `}
                                  <Button
                                    onClick={() => this.deleteCurso(curso._id)}
                                    color="danger"
                                    size="sm"
                                  >
                                  <i style={iconStyle} className="tim-icons icon-simple-remove"></i>
                                  </Button>
                                </td>
                              </tr>
                              ))
                            }
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
              </Row>
            </Form>
          </div>
      </div>
    </>
    );
  }
}

export default Cursos;
