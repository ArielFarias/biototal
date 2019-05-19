import React from "react";
import axios from "axios";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  Table
} from "reactstrap";

class Matriculas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aluno: "",
      curso: "",
      visible: true,
      intervalIsSet: false,
      alunos: [],
      cursos: [],
      matriculas: []
    };
  }

  componentDidMount() {
    this.getMatricula();
    fetch("http://localhost:3001/api/alunos")
      .then(data => data.json())
      .then(res => this.setState({ alunos: res.data }));
    fetch("http://localhost:3001/api/cursos")
      .then(data => data.json())
      .then(res => this.setState({ cursos: res.data }));
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getMatricula(), 15000);
      this.setState({ intervalIsSet: interval });
    }
  }
  
  createMatricula = () => {
    axios.post("http://localhost:3001/api/matricula", {
      curso: this.state.curso.value,
      aluno: this.state.aluno.value
    }).then(() => this.getMatricula());
  };
  
  getMatricula = () => {
    fetch("http://localhost:3001/api/matriculas")
      .then(data => data.json())
      .then(res => this.setState({ matriculas: res.data }));
  };

  editMatricula = (e, id, key) => {
    const valor = e.value;
    this.setState(prevState => ({
      matriculas: prevState.matriculas.map(matricula => (
        matricula._id === id ? {...matricula, [key]: valor} : matricula)
      )
    }))
  }
  
  updateMatricula = id => {
    const updatedMatricula = this.state.matriculas.find(
      matricula => matricula._id === id
    );
    axios.post(`http://localhost:3001/api/updateMatricula/${id}`, {
      id,
      update: {
        aluno: updatedMatricula.aluno,
        curso: updatedMatricula.curso
      }
    }).then(() => this.getMatricula());
  };

  deleteMatricula = id => {
    axios.delete(`http://localhost:3001/api/matricula/${id}`, {
      data: {
        id
      }
    }).then(() => this.getMatricula());
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  handleChange = (e, key) => {
    this.setState({ [key]: e });
  }

  render() {
    const cursosOptions = this.state.cursos.map(curso => ({
      value: curso._id,
      label: curso.titulo
    }));
    const alunosOptions = this.state.alunos.map(aluno => ({
      value: aluno._id,
      label: aluno.nome
    }));

    const iconStyle = {
      margin: '2px'
    };

    const customStyles = {
      option: (provided, {isDisabled, isFocused, isSelected }) => ({
        ...provided,
          color: '#1D1E2D',
          backgroundColor: isSelected ? '#DEE7FF' : 'white'
      }),
      control: styles => ({ ...styles, 
        backgroundColor: 'default',
        fontSize: '12px',
        borderColor: '#2B3553',
      }),
      singleValue: (styles) => ({
        ...styles,
        // fontFamily: 'Poppins',
        fontSize: '12px',
        color: '#C3C3C8' 
      })
    }

    return (
      <>
        <div className="content">
          <h3>
          Matriculas
          </h3>
            <div>
              <Form>
                <Row>
                <Col xs={12} />
                  <Col xs={3}>
                    <FormGroup>
                      <Label for="formSelect">Curso</Label>
                      <Select
                          id="formSelect"
                          styles={customStyles}
                          options={cursosOptions}
                          value={this.state.curso}
                          onChange={e => this.handleChange(e, "curso")}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="formSelect">Aluno</Label>
                      <Select
                          id="formSelect"
                          styles={customStyles}
                          options={alunosOptions}
                          value={this.state.aluno}
                          onChange={e => this.handleChange(e, "aluno")}
                      />
                    </FormGroup>
                    <Button
                      color="success"
                      onClick={this.createMatricula}
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
                              <th>Aluno</th>
                              <th>Curso</th>
                              <th />
                              </tr>
                          </thead>
                          <tbody>
                              {this.state.matriculas.map((matricula, index) => (
                                <tr key={matricula._id}>
                                  <td className="text-center">
                                    {index + 1}
                                  </td>
                                  <td>
                                    <Select
                                        id="formSelect"
                                        styles={customStyles}
                                        options={alunosOptions}
                                        value={alunosOptions.find(aluno => aluno.value === matricula.aluno)}
                                        onChange={e => this.editMatricula(e, matricula._id, "aluno")}
                                    />
                                  </td>
                                  <td>
                                    <Select
                                        id="formSelect"
                                        styles={customStyles}
                                        options={cursosOptions}
                                        value={cursosOptions.find(curso => curso.value === matricula.curso)}
                                        onChange={e => this.editMatricula(e, matricula._id, "curso")}
                                    />
                                  </td>
                                  <td />
                                  <td className="text-right">
                                    <Button
                                      color="success"
                                      size="sm"
                                      onClick={() => this.updateMatricula(matricula._id)}
                                    >
                                    <i style={iconStyle} className="tim-icons icon-pencil"></i>
                                    </Button>{` `}
                                    <Button
                                      onClick={() => this.deleteMatricula(matricula._id)}
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

export default Matriculas;
