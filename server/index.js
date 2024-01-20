const express = require('express')
const cors = require('cors')
const request = require("request");
const PORT = 5000
const limit = 10

const app = express()
app.use(cors())
app.use(express.json())
app.get('/apartments/:number', (req, res) => {
    const number = req.params
    const request = require('request');
    const url = 'https://level.ru/api/contractor/flat/?limit=' + number.number + '&offset=0&project=nizheg'
    const options = {
        url: url,
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
})
app.get('/pantry/:number', (req, res) => {
    const number = req.params
    const request = require('request');
    const url = 'https://level.ru/api/contractor/pantry/?limit=' + number.number + '&offset=0&project=nizheg'
    const options = {
        url: url,
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
})
app.get('/parking/:number', (req, res) => {
    const number = req.params
    const request = require('request');
    const url = 'https://level.ru/api/contractor/parking/?limit=' + number.number + '&offset=0&project=nizheg'
    const options = {
        url: url,
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
})
app.get('/commercial/:number', (req, res) => {
    const number = req.params
    const request = require('request');
    const url = 'https://level.ru/api/contractor/commercial/?limit=' + number.number + '&offset=0&project=nizheg'
    const options = {
        url: url,
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
})
app.post('/', (req, res) => {
    const {rooms} = req.body
    console.log(rooms)
    // type - тип квартиры: aparts - апартаменты, parking - парковка, pantry - складские помещения, commercial - коммерческое помещение
    // building - корпус
    // number - Номер квартиры
    res.sendStatus(200)
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