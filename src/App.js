import Auth from './components/Auth';
import Logins from './components/Logins';
import Sobre from './components/Sobre';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  
  return (
    <div className="App">
      <h1 className='text-center'>Login Manager</h1>
      <BrowserRouter>

        <Routes>
        <Route path="/" index element={<Auth/>}></Route>
        <Route path="/logins" index element={<Logins/>}></Route>
        <Route path="/sobre" index element={<Sobre/>}></Route>
      </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
