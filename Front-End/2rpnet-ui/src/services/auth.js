import { useNavigate } from 'react-router-dom'

// define a constante usuarioAutenticado para verificar se o usuário está logado
export const usuarioAutenticado = () => localStorage.getItem('2rp-chave-autenticacao') !== null;

// define a constante parseJwt que retorn o payload do usuário logado convertido em JSON
export const parseJwt = () => {

    // define a variável base64 que recebe o payload do token do usuário logado
    let base64 = localStorage.getItem('2rp-chave-autenticacao').split('.')[1];

    // converte o valor de base64 para string e em seguida para JSON
    return JSON.parse( window.atob(base64) );
};

export const handleAuthException = async (error) => {
    
    if (error !== undefined && error !== null) {
        if (error.response.status === 401) {
            return true
        }
    }
    
    if (localStorage.getItem('2rp-chave-autenticacao') === null) {
        return true
    }
    else {
        const jwt = parseJwt();
        let jwtDate = new Date(jwt.dataExpiracao);
        if (jwtDate >= new Date(Date.now())) {
            return true
        }
    }

    return false
}