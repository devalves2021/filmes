import {useEffect , useState} from 'react';
import './favoritos.css';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

export default function Favoritos(){
    const [filmes , setFilmes] = useState([]);
    useEffect(()=>{
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);   
    
    function handleDelete(id){
        //! filter percorre todo o array e devolve uma lista conforme a condição determnada ,  neste condição ele ira devolve todos os filmes menos o com id determinada na exclusão.
        let filtroFilmes = filmes.filter((item)=>{
            return(item.id !== id)
        })
        //! devolve todos os filmes menos o filme excluido.
        setFilmes(filtroFilmes);
        //! atualiza o localStorage como tbm o filtro filmes.
        localStorage.setItem('filmes' , JSON.stringify(filtroFilmes))
        toast.success('Filme excluido com sucesso.');
    }
     //! se o tamanho do array for igual a zero, então mostra a mensagem para o usuario.
    return(
            <div className="container" >
                <h2>Meus Filmes</h2>
               
                {filmes.length === 0 && <span>Você não possui nenhum filme salvo.</span>}
                <ul>
                    {filmes.map((item)=>{
                        return(
                            <li key={item.id}>
                                <span>{item.nome}</span>

                                <div>
                                 
                                    <Link className="detalhes"  to={`/filme/${item.id}`} >Ver Detalhes</Link>
                                    <button className="button" onClick={ ()=> handleDelete(item.id)} >Excluir</button>
                                  
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

    )
}
