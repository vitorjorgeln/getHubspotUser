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
                .catch(function (error) {
                        if (error.response) {
                                var erro = {
                                        "status": "error",
                                        "message": error.response.data.message
                                }
                                return res.status(error.response.status).json(erro)
                        }
                })

        if (data) {
                var retorno = []

                requests.params.forEach(param => {
                        retorno.push(data.properties[param].value)
                });

                const obj = Object.assign({}, retorno);

                for (let index = 0; index < requests.params.length; index++) {

                        obj[requests.params[index]] = obj[index]
                        delete obj[index]
                }

                return res.json(obj)
        }
})
const PORT = process.env.PORT || 666
app.listen(PORT)