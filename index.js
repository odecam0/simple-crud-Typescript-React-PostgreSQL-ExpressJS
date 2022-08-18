const express = require('express');
const app = express();

app.use(express.static('client/build'));

const mock_data = {
    "nome_produto": "produto1",
    "valor": 500,
    "quantidade_vendas": 20,
    "codigo": "1234567",
    "descricao": "Um produto de mentira",
}

app.get('/mock_data', (req, res) => {
    console.log("Get to /mock_data");
    res.send(mock_data);
})

app.get('*', (req, res) => {
    res.sendFile('client/build/index.html');
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Express listening to port: ${port}`)
})
