const axios = require('axios')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

var jsonParser = bodyParser.json();

app.post('/gethubspotuser/email/:email/', jsonParser, async (req, res) => {
        let url = 'https://api.hubapi.com/contacts/v1/contact/email/'
        const requests = req.body
        const params = req.params
        const headers = req.headers
        const { data } = await axios.get(url + params.email + '/profile?hapikey=' + headers.hapikey + '')

        var retorno = []

        requests.params.forEach(param => {
                retorno.push(data.properties[param].value)
        });

        const obj = Object.assign({}, retorno);

        const renameKeys = (keysMap, obj) =>
                Object.keys(obj).reduce(
                        (acc, key) => ({
                                ...acc,
                                ...{ [keysMap[key] || key]: obj[key] }
                        }),
                        {}
                );

        const keys = Object.assign({}, requests.params);

        for (let index = 0; index < requests.params.length; index++) {

                obj[requests.params[index]] = obj[index]
                delete obj[index]
        }

        return res.json(obj)
})

const PORT = process.env.PORT || 666
app.listen(PORT)