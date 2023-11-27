import axios from "axios";

export const $host = axios.create({
    baseURL: 'https://level.ru/api/contractor/flat/',
    auth: {
        username: 'photonlab.public@gmail.com',
        password: '?TORQ3*5am'
    }
})

// await axios.post(session_url, {}, {
//     auth: {
//         username: uname,
//         password: pass
//     }
// });