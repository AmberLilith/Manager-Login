import { Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom'
function FormUser(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [validated, setValidated] = useState(false);
  const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));
  const navigate = useNavigate()

  if (isExpired) {
    alert("Login expirado!");
    navigate('/');
  }

  const onSubmit = data => {
    if (!isExpired) {
      axios.post("http://localhost:8080/logins", data, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((respose) => {
          if (respose.status == 201) {
            document.getElementById('sucesso').innerHTML = 'Login cadastrado com sucesso!';
            document.getElementById('sucesso').setAttribute('class', 'd-block text-danger text-center');
            props.updateUpdates();
          }

          if(respose.status == 403){            
          alert("Login expirado!");
          navigate('/');
          }

        })

        .catch(() => {
        })
    } else {

      alert("Login expirado!");
      navigate('/');

    }

  }

  return (

    <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
      <h6 id='sucesso' className='d-none text-center'>Usuário cadastrado com sucesso!</h6>
      {/* <Form.Group className={"mb-3 " + props.showId} >
        <Form.Label className='text-white'>Id:</Form.Label>
        <Form.Control type='text' {...register("id")} readonly="true" />
      </Form.Group> */}

      <Form.Group className="mb-3">
        <Form.Label className='text-white'>Usuário:</Form.Label>
        <Form.Control placeholder="Informe usuário" {...register("userName", { required: true })} required />
        {errors.userName && <span className='text-danger'>Informe o usuário</span>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='text-white'>Senha:</Form.Label>
        <Form.Control type="password" {...register("password", { required: true })} placeholder="Senha" />
        {errors.password && <span className='font-weight-bold text-danger'>Informe a senha</span>}
      </Form.Group>      
      <Row>
        <Col></Col>
        <Col></Col>
        <Col className='text-center'><Button type='submit'>Salvar</Button></Col>
      </Row>

    </Form>

  );
}

export default FormUser;