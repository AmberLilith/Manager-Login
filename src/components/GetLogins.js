import {Table, Button, Row, Col} from 'react-bootstrap';
import ModalFormLogin from './ModalFormLogin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useJwt } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import LoginPagination from './LoginPagination';

function GetLogins(){
    const [logins, setLogins] = useState([]);    
    const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));
    const navigate = useNavigate()
    const [totalPages, setTotalPages] = useState();
    const [activePage, setActivePage] = useState(0);
    const [url, setUrl] = useState("http://localhost:8080/logins?size=5&page=" + activePage);
    const [changes, setChanges] = useState(0)

    const updateActivePage = (page) => {
      setActivePage(page)
    }

    const updateListOfLogins = () => {
      setChanges(changes + 1)
    }

    const updateUrl = (page) => setUrl("http://localhost:8080/logins?size=5&page=" + page);



    if(isExpired){
    alert("Login expirado!");
    navigate('/');
  }

    useEffect(() => {
        axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
      .then((respose) => {
          setLogins(respose.data.content)
          setTotalPages(respose.data.totalPages)
      })

      .catch(() =>{
          console.log("Erro!")
      })
  },  [activePage,changes])
  
    return (
        <div >
          <div style={{height:'350px'}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Usuário</th>
                <th>Site</th>
                <th>Gerir</th>
              </tr>
            </thead>
            <tbody>
              {logins.map((login, key) => {
                  return (
                    <tr key={key}>
                <td>{login.userName}</td>
                <td>{login.site}</td>
                <td>
                    <ModalFormLogin
                      buttonType="primary"
                      text="Atualizar"
                      title="Alterar Login"
                      showId="d-block"
                      loginId={login.id}
                      updateListOfLogins={updateListOfLogins}
                      formType="update"
                    />
                    &nbsp;&nbsp;&nbsp;
                    <ModalFormLogin
                      buttonType="danger"
                      text="Exlcuir"
                      title="Confirme exclusão"
                      showId="d-block"
                      loginId={login.id}
                      updateListOfLogins={updateListOfLogins}
                      confirmationMessage={"Deseja realmente excluir o login " + login.login + "?"}
                      formType="delete"
                    />
                </td>
              </tr>    
                  )
              })}       
            </tbody>
          </Table>
          </div>
          <Row>
        <Col></Col>
        <Col className='text-center'>
        <LoginPagination updateActivePage={updateActivePage} updateUrl={updateUrl} totalPages={totalPages}/>
        </Col>
        <Col></Col>
      </Row>
        </div>
      );
}

export default GetLogins;












// import {Table, Button, Row, Col, Pagination} from 'react-bootstrap';
// import ModalFormLogin from './ModalFormLogin';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useJwt } from "react-jwt";
// import { useNavigate } from 'react-router-dom';
// //import LoginPagination from './LoginPagination';

// function GetLogins(){
//     const [logins, setLogins] = useState([]);    
//     const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));
//     const navigate = useNavigate()
//     const [totalPages, setTotalPages] = useState();
//     const [activePage, setActivePage] = useState(1);
//     const [url, setUrl] = useState("http://localhost:8080/logins?size=5&page=" + activePage);

//     if(isExpired){
//     alert("Login expirado!");
//     navigate('/');
//   }

//     useEffect(() => {
//         axios.get(url, {
//         headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem('token')
//         }
//       })
//       .then((respose) => {
//           setLogins(respose.data.content)
//           setTotalPages(respose.data.totalPages)
//       })

//       .catch(() =>{
//           console.log("Erro!")
//       })
//   },  [activePage])
//   //  dependencies é um array opcional de dependências. useEffect() executa o retorno
//   //   de chamada apenas se as dependências forem alteradas entre as renderizações.

//   let active = 2;
//   let items = [];
//   for (let number = 0; number < totalPages; number++) {
//       items.push(number);
//   }

// console.log(activePage)
// console.log(url)
//     return (
//         <>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Usuário</th>
//                 <th>Site</th>
//                 <th>Gerir</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logins.map((login, key) => {
//                   return (
//                     <tr key={key}>
//                 <td>{login.login}</td>
//                 <td>{login.site}</td>
//                 <td>
//                     <ModalFormLogin
//                       buttonType="primary"
//                       text="Atualizar"
//                       title="Alterar Login"
//                       showId="d-block"
//                     />
//                     &nbsp;&nbsp;&nbsp;
//                       <Button variant='danger'>Excluir</Button>
//                 </td>
//               </tr>    
//                   )
//               })}       
//             </tbody>
//           </Table>
//           <Row>
//         <Col></Col>
//         <Col className='text-center'>
//         <nav aria-label="Page navigation example">
//             <ul className="pagination" active={active}>
//                 {items.map(item => (
//                     <li key={"item_" + item} id={"item_" + item} className="page-item"><a className="page-link" onClick={() => [setActivePage(item), setUrl("http://localhost:8080/logins?size=5&page=" + item)]} href="#">{item} </a></li>
//                 ))}

//             </ul>
//         </nav>
//         </Col>
//         <Col></Col>
//       </Row>
//         </>
//       );
// }

// export default GetLogins;


















// import {Table, Button, Row, Col, Pagination} from 'react-bootstrap';
// import ModalFormLogin from './ModalFormLogin';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useJwt } from "react-jwt";
// import { useNavigate } from 'react-router-dom';
// import LoginPagination from './LoginPagination';

// function GetLogins(){
//     const [logins, setLogins] = useState([]);    
//     const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));
//     const navigate = useNavigate()
//     const [totalPages, setTotalPages] = useState();
//     const [url, setUrl] = useState("http://localhost:8080/logins?size=5");

//     if(isExpired){
//     alert("Login expirado!");
//     navigate('/');
//   }


//     useEffect(() => {
//         axios.get("http://localhost:8080/logins?size=5", {
//         headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem('token')
//         }
//       })
//       .then((respose) => {
//           setLogins(respose.data.content)
//           setTotalPages(respose.data.totalPages)
//       })

//       .catch(() =>{
//           console.log("Erro!")
//       })
//   },  [])

    


//     return (
//         <>
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Usuário</th>
//                 <th>Site</th>
//                 <th>Gerir</th>
//               </tr>
//             </thead>
//             <tbody>
//               {logins.map((login, key) => {
//                   return (
//                     <tr key={key}>
//                 <td>{login.login}</td>
//                 <td>{login.site}</td>
//                 <td>
//                     <ModalFormLogin
//                       buttonType="primary"
//                       text="Atualizar"
//                       title="Alterar Login"
//                       showId="d-block"
//                     />
//                     &nbsp;&nbsp;&nbsp;
//                       <Button variant='danger'>Excluir</Button>
//                 </td>
//               </tr>    
//                   )
//               })}       
//             </tbody>
//           </Table>
//           <Row>
//         <Col></Col>
//         <Col className='text-center'><LoginPagination totalPages={4} /></Col>
//         <Col></Col>
//       </Row>
//         </>
//       );
// }

// export default GetLogins;