import ModalFormLogin from './ModalFormLogin';
import GetLogins from './GetLogins';
//TODO obter nome usuário logado para colocar no cabeçalho
function Logins() {

  return (
    <>
      <div id='divLogins' className='p-3'>
        <ModalFormLogin
          buttonType="primary"
          text="Novo"
          title="Cadastrar Novo Login"
          showId="d-none"
          formType="create"
          
        />
      </div>
      <GetLogins />      
    </>
  );
}

export default Logins;