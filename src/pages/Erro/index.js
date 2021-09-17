import './erro.css';
import {Link} from 'react-router-dom';

export default function Erro(){
    return(
        <div className="container">
            <h1>404</h1>
            <h2>Página não encontrada !!</h2>
            <Link className="detalhes" to="/">Veja todos os filmes disponíveis , click aqui. </Link>
        </div>

    )

}


