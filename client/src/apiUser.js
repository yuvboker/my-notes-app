const axios = require('axios').default;
axios.withCredentials = true
const tough = require('tough-cookie');
const axiosCookieJarSupport = require('axios-cookiejar-support')

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials:true
})

axiosCookieJarSupport(api);
api.defaults.jar = new tough.CookieJar();


export const findOrCreate = user => api.post('/auth/google', user);
export const login = user => api.post('/login', user).then(res=>res.data);
export const register = user => api.post('/register', user);
export const logout = () => api.get('/logout');
export const authenticate = () => api.get('/');


const apisUser = {
    login,
    register,
    authenticate,
    logout,
    findOrCreate,
}

export default apisUser