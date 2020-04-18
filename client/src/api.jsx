const axios = require('axios').default;
axios.withCredentials = true
const tough = require('tough-cookie');
const axiosCookieJarSupport = require('axios-cookiejar-support')

const api = axios.create({
    baseURL: 'https://save-time-note-app.herokuapp.com',
    jar: new tough.CookieJar(),
    withCredentials:true
})
axiosCookieJarSupport(api);
api.defaults.jar = new tough.CookieJar();

export const add = (username, note) => api.post( username + '/myNotes', note).then(res => res.data);
export const getAll = (username) => api.get(username + '/myNotes');
export const deleteAll = (username) => api.delete( username + '/myNotes');
export const updateByID = (username, id, note) => api.put(username + '/myNotes/' + id, note);
export const deleteByID = (username, id) => api.delete(username + '/myNotes/' + id);
export const getByID = (username, id) => api.get(username + '/myNotes/'+ id);

const apis = {
    add,
    getAll,
    deleteAll,
    updateByID,
    deleteByID,
    getByID
}

export default apis