const axios = require('axios').default;
axios.withCredentials = true
const tough = require('tough-cookie');
const axiosCookieJarSupport = require('axios-cookiejar-support')

const api = axios.create({
    baseURL: 'http://localhost:3000/',
    jar: new tough.CookieJar(),
    withCredentials:true
})
axiosCookieJarSupport(api);
api.defaults.jar = new tough.CookieJar();

export const add = (username, note) => api.post( username + '/notes', note).then(res => res.data);
export const getAll = (username) => api.get(username + '/notes');
export const deleteAll = (username) => api.delete( username + '/notes');
export const updateByID = (username, id, note) => api.put(username + '/notes/' + id, note);
export const deleteByID = (username, id) => api.delete(username + '/notes/' + id);
export const getByID = (username, id) => api.get(username + '/notes/'+ id);

const apis = {
    add,
    getAll,
    deleteAll,
    updateByID,
    deleteByID,
    getByID
}

export default apis