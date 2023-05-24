import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function Sobre(){
    const navigate = useNavigate()
    return (

        <div>
            <Button onClick={alert("cu")}>logins</Button>
            <p>{localStorage.getItem("chave")}</p>
        </div>
    )
}

export default Sobre;