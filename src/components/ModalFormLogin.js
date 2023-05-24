import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import FormCadastrarLogin from './FormCadastrarLogin';
import FormAtualizarLogin from './FormAtualizarLogin';
import { Form } from 'react-bootstrap';
import FormExcluirLogin from './FormExcluirLogin';

function ModalFormLogin({buttonType,text,title,showId, loginId, formType, updateListOfLogins,confirmationMessage}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const qual = () =>{
    if (formType === "create"){
      return <FormCadastrarLogin updateListOfLogins={updateListOfLogins} closeModal={handleClose}/>
    }else if(formType === "update"){
      return <FormAtualizarLogin showId={showId} loginId={loginId} updateListOfLogins={updateListOfLogins} closeModal={handleClose}/>
  }else if(formType === "delete"){
    return <FormExcluirLogin loginId={loginId} updateListOfLogins={updateListOfLogins} closeModal={handleClose} confirmationMessage={confirmationMessage}/>
  }
  }

  return (
    <>
      <Button variant={buttonType} onClick={handleShow}>
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body  className='bg-dark'>
         { qual()}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalFormLogin;