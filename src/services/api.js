import axios from 'axios';

// Base Url > https://sujeitoprogramador.com/

// (TODOS OS FILEMS)  r-api/?api=filmes/  

// (FILME COM SEU ID)  r-api/?api=filmes/123


const api = axios.create({
 baseURL: 'https://sujeitoprogramador.com'
});

export default api;