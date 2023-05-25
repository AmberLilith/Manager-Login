import { Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()

    const onSubmit = data => {
        axios.post("http://localhost:8080/auth", data)
            .then((respose) => {
                storageToken(respose.data.token)
                if (respose.status == 200) {
                    navigate('/logins')
                }

            })

            .catch(() => {
                document.getElementById('h6LoginInvalido').setAttribute('class', 'd-block text-danger text-center');
            })
    }

    function storageToken(token) {
        localStorage.setItem("token", token)
    }



    return (
        <Container>
            <Row>
                <Col></Col>
                <Col className='border pb-3'>
                    <h3 className='text-center'>Autenticação</h3>
                    <h6 id='h6LoginInvalido' className='d-none text-center'>Usuário e/ou senha inválidos!</h6>
                    <Form noValidate validated={validated} onSubmit={handleSubmit(onSubmit)} className='border rounded p-3 bg-dark'>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuário:</Form.Label>
                            <Form.Control placeholder="Informe usuário" {...register("userName", { required: true })} required />
                            {errors.userName && <span className='text-danger'>Informe o usuário</span>}
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control type="password" {...register("password", { required: true })} placeholder="Senha" />
                            {errors.password && <span className='font-weight-bold text-danger'>Informe a senha</span>}
                        </Form.Group>
                        <Row>
                            <Col></Col>
                            <Col>
                                <Button className='btn btn-warning btn-lg btn-block' type="submit">
                                    Login
                                </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Auth;