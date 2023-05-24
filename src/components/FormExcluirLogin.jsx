import { Col, Container, Row, Button, Form, InputGroup, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom'
function FormExcluirLogin({loginId, updateListOfLogins, closeModal, confirmationMessage}) {

  const token = localStorage.getItem('token');
  const { register, handleSubmit, setValue, unregister, getValues, formState: { errors } } = useForm();
  const { decodedToken, isExpired } = useJwt(token)
  const navigate = useNavigate()

  if (isExpired) {
    alert("Login expirado!");
    navigate('/');
  }

  const deleteLogin = () =>{
    if (!isExpired) {
      axios.delete("http://localhost:8080/logins/" + loginId, {
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


  const onSubmit = data => {
    deleteLogin(data)
  }

  return (

    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <h6 className='text-center text-white'>{confirmationMessage}</h6> 
      <div className='text-center mt-3'>
      <Button className='btn btn-warning' type='submit'>Excluir</Button>
        <Button className='btn btn-warning'onClick={() => closeModal()} style={{marginLeft:10}}>Cancelar</Button>
      </div>
           
    
      

    </Form>
    </>
    
  );
}

export default FormExcluirLogin;