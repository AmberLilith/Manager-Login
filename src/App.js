import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="mx-2 mt-2">
      <div className='row'>
        <div className='col'>
        <button className='btn btn-warning'>CRIAR USUÁRIO</button>
        </div>
        <div className='col'>
        <h1 className='text-center'>LOGIN MANAGER</h1>
        </div>
        <div className='col'>
        <button className='btn btn-warning position-absolute end-0'>LOGOUT</button>
        </div>
      </div>      
    </div>
  );
}

export default App;
