const express = require('express')
const cors = require('cors')
const PORT = 5000

const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
    const request = require('request');
    const options = {
        url: 'https://level.ru/api/contractor/flat/?limit=16&offset=0&project=nizheg',
        // url: 'https://level.ru/api/flat/cropped_list?windows_directions="south"',
        auth: {
            username: 'photonlab.public@gmail.com',
            password: '?TORQ3*5am',
        }
    };
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body);
            return res.json(info)
            // console.log(info)
        }
    }
    request(options, callback);

    // res.sendStatus(200);
})

const start = async () => {
    try{
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}
start()

// const request = require('request');
// const options = {
//     url: 'https://level.ru/api/contractor/flat/?project=nizheg',
//     auth: {
//         username: 'photonlab.public@gmail.com',
//         password: '?TORQ3*5am',
//     }
// };
//
// function callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         const info = JSON.parse(body);
//         // console.log(info)
//     }
// }
// request(options, callback);