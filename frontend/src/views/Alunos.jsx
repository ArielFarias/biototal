import React from "react";
import axios from "axios";
import moment from "moment";

import {
  Table,
  Button,
  CardBody,
  Card,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class Alunos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      email: "",
      nome: "",
      date: "",
      alunos: []
    };
  }

  componentDidMount() {
    this.getAluno();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  getAluno = () => {
    fetch("/api/alunos")
      .then(data => data.json())
      .then(res => this.setState({ alunos: res.data }));
  };

  createAluno = () => {
    axios.post("/api/aluno", {
      nome: this.state.nome,
      email: this.state.email,
      date: this.state.date
    }).then(() => this.getAluno());
  };

  editAluno = (e, id, key) => {
    const valor = e.target.value;
    this.setState(prevState => ({
      alunos: prevState.alunos.map(aluno => (
        aluno._id === id ? {...aluno, [key]: valor} : aluno)
      )
    }));
  }

  updateAluno = id => {
    const updatedAluno = this.state.alunos.find(aluno => aluno._id === id);
    axios.post(`/api/updateAluno/${id}`, {
      id,
      update: {
        nome: updatedAluno.nome,
        date: updatedAluno.date,
        email: updatedAluno.email
      }
    }).then(() => this.getAluno());
  };

  deleteAluno = id => {
    axios.delete(`/api/aluno/${id}`, {
      data: {
        id
      }
    }).then(() => this.getAluno())
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
          Alunos
        </h3>
        <div>
          <Form>
            <Row>
            <Col xs={12} />
              <Col xs={3}>
                <FormGroup>
                  <Label for="formEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="formEmail"
                    placeholder="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="formNome">Nome</Label>
                  <Input
                    type="text-field"
                    name="nome"
                    id="formNome"
                    placeholder="nome"
                    value={this.state.nome}
                    onChange={(e) => this.setState({ nome: e.target.value })}
                  />
                </FormGroup>    
                <FormGroup>
                  <Label for="formDate">Nascimento</Label>
                  <Input
                    type="date"
                    name="date"
                    id="formDate"
                    placeholder="date placeholder"
                    value={this.state.date}
                    onChange={(e) => this.setState({ date: e.target.value })}
                  />
                </FormGroup>
                <Button
                  color="success"
                  onClick={this.createAluno}
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
                          <th>Nome</th>
                          <th>Nascimento</th>
                          <th>Email</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.alunos.map((aluno, index) => (
                          <tr key={aluno._id}>
                            <td className="text-center">
                              {index + 1}
                            </td>
                            <td>
                              <Input
                                type="text-field"
                                name="nome"
                                placeholder="Nome"
                                value={aluno.nome}
                                onChange={e => this.editAluno(e, aluno._id, "nome")}
                              />
                            </td>
                            <td>
                              <Input
                                type="date"
                                name="date"
                                value={moment(aluno.date).format("YYYY-MM-DD")}
                                onChange={e => this.editAluno(e, aluno._id, "date")}
                              />
                            </td>
                            <td>
                              <Input
                                type="email"
                                name="email"
                                id="formEmail"
                                placeholder="email"
                                value={aluno.email}
                                onChange={e => this.editAluno(e, aluno._id, "email")}
                              />
                            </td>
                            <td className="text-right">
                              <Button
                                color="success"
                                size="sm"
                                onClick={() => this.updateAluno(aluno._id)}
                              >
                              <i style={iconStyle} className="tim-icons icon-pencil"></i>
                              </Button>{` `}
                                <Button
                                  color="danger"
                                  size="sm"
                                  onClick={() => this.deleteAluno(aluno._id)}
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

export default Alunos;
