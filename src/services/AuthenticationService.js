import axios from 'axios'

class AuthenticationService {

    executeJwtAuthenticationService(username, password) {
        //return axios.post(process.env.REACT_APP_API_URL + "/api/login", {
        return axios.post("/api/login", {
            username,
            password
        })
    }
    

    executeHelloService() {
        console.log("===executeHelloService===")
        return axios.get(process.env.REACT_APP_API_URL +"/hello");        
    }

    registerSuccessfulLoginForJwt(username, token) {
        console.log("===registerSuccessfulLoginForJwt===")
        localStorage.setItem('token', token);
        localStorage.setItem('authenticatedUser', username);
        // sessionStorage.setItem('authenticatedUser', username)
        //this.setupAxiosInterceptors(this.createJWTToken(token))
        this.setupAxiosInterceptors();
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }
    //Axios는 자바스크립트에서 HTTP 통신을 위해 쓰이는 Promise 기반 HTTP Client이다.
    //Axios Interceptors는 모든 Request/Response가 목적지에 도달하기 전에 Request에 원하는 내용을 담아 보내거나 원하는 코드를 실행시킬 수 있다.
    
    setupAxiosInterceptors() {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    logout() {
        //sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    isUserLoggedIn() {
        
        //let user = sessionStorage.getItem('authenticatedUser')
        const token = localStorage.getItem('token');
        console.log("===UserloggedInCheck===");
        console.log(token);

        if (token) {
            return true;
        }
        //if(user===null) return false
        return false;
    }

    getLoggedInUserName() {
        //let user = sessionStorage.getItem('authenticatedUser')
        let user = localStorage.getItem('authenticatedUser');
        if(user===null) return '';
        return user;
    }


}

export default new AuthenticationService()
