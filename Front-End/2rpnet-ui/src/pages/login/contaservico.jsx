import http from '../../services/auth';

const logar = dados => {
        return http.post('/api/Login' , JSON.stringify(dados));
}

export default{
        logar
}