import { Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom'
function FormAtualizarLogin({loginId, updateListOfLogins, closeModal}) {

  const token = localStorage.getItem('token');
  const { register, handleSubmit, setValue, unregister, getValues, formState: { errors } } = useForm();
  const [validated, setValidated] = useState(false);
  const { decodedToken, isExpired } = useJwt(token)
  const navigate = useNavigate()

  if (isExpired) {
    alert("Login expirado!");
    navigate('/');
  }

  const loadValuesFromSelectedLogin = (selectedLogin) =>{
    setValue('id', selectedLogin.id)
    setValue('userName', selectedLogin.userName, { shouldValidate: true })
    setValue('password', selectedLogin.password, { shouldValidate: true })
    setValue('site', selectedLogin.site, { shouldValidate: true })
    setValue('observation', selectedLogin.observation, { shouldValidate: true })
  }

  const updateLogin = (data) =>{
    if (!isExpired) {
      axios.put("http://localhost:8080/logins/" + loginId, data, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
        .then((response) => {
          if (response.status == 200) {            
            updateListOfLogins();
            closeModal();
            
          }

          if(response.status == 403){            
          alert("Login expirado!");
          navigate('/');
          }

        })

        .catch((error) => {
          console.log(error)
        })
    } else {

      alert("Login expirado!");
      navigate('/');

    }
  }



  useEffect(() => {
    axios.get("http://localhost:8080/logins/" + loginId, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => {
      loadValuesFromSelectedLogin(response.data)
  })

  .catch(() =>{
      console.log("Erro!")
  })
},  [])

  const onSubmit = data => {
    updateLogin(data)
  }

  return (

    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)}>
      <h6 id='sucesso' className='d-none text-center'>Login cadastrado com sucesso!</h6>
      <Form.Group className={"mb-3 "} >
        <Form.Label className='text-white'>Id:</Form.Label>
        <Form.Control type='text' {...register("id")} readonly="true" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='text-white'>Usuário:</Form.Label>
        <Form.Control placeholder="Informe usuário" {...register("userName", { required: true })} required />
        {errors.userName && <span className='text-danger'>Informe o usuário</span>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='text-white'>Senha:</Form.Label>
        <Form.Control type="password" {...register("password", { required: true})} placeholder="Senha" />
        {errors.password && <span className='text-danger'>Informe a senha</span>}
      </Form.Group> 

      <Form.Group className="mb-3">
        <Form.Label className='text-white'>Site/Plataforma:</Form.Label>
        <Form.Control type="text" {...register("site", { required: true })} placeholder="Informe o nome do site/plataforma" />
        {errors.site && <span className='font-weight-bold text-danger'>Informe o site/plataforma</span>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className='text-white'>Observações:</Form.Label>
        <Form.Control as="textarea" rows="5"{...register("observation", { required: true })} placeholder="Observações..." />
      </Form.Group>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col className='text-center'><Button type='submit'>Salvar</Button></Col>
      </Row>

    </Form>
    </>
    
  );
}

export default FormAtualizarLogin;