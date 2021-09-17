import {useEffect , useState} from 'react';
import './filme-info.css';
import { useParams , useHistory } from 'react-router-dom';
import api from '../../services/api';
import {toast} from 'react-toastify';



export default function Filme(){
    const {id}= useParams();
    const history = useHistory();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

      //! quando a pagina carregar ele executa o useeffect  busca a Url com respectivo id.
    useEffect(()=>{
        async function loadFilme(){
                const response = await api.get(`r-api/?api=filmes/${id}`);
                if(response.data.length === 0 ){
                    //!tentou acessarcom um com um ID que não existe, ele foi direcionado para tela Home
                    history.replace('/');
                    return;
                }

                setFilme(response.data);
                setLoading(false);

        }

        loadFilme();

        return()=>{
            console.log('Componente Desmontado.')
        }

    }, [history, id]);

    function salvaFilme(){
       
        const minhalista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhalista)|| [];

        //!Se tiver algum flme salvo com o mesmo id precisa ignorar
        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.info('Você ja possui esse filme salvo.');
            return;
        }

        filmesSalvos.push(filme);
        //! neste codigo , o sistema devolve uma lista onde sera convertida em string via json, e carrega a lista de filme salves.
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso.');
    }


    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando seu Filme</h1>
            </div>
        )
    }
    return(
         <div className="container">
             <h2>{filme.nome}</h2>
             <img className="img" src={filme.foto} alt={filme.nome} />
             <h3>Sinopse</h3>
             {filme.sinopse}
             <div className="filme-info" >
                 <button className="button" onClick={salvaFilme} >Salvar</button>
                 <button className="button">
                     <a className="a" target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                     </a>
                 </button>
             </div>
          </div>
     )
 }