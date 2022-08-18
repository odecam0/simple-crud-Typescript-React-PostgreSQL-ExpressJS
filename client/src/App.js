import React, { useState } from 'react';
import './App.css';

function App(props) {
    const [mock, setMock] = useState({
	"nome_produto": "",
	"valor": "",
	"quantidade_vendas": "",
	"codigo": "",
	"descricao": "",
    })

    function getMock() {
	fetch('/mock_data', {cache: "no-store"})
	    .then(res => res.json())
	    .then(data => setMock(data))
	    .catch(err => console.error(err))
    }

    return (
	<div className="App">
	    <button onClick={getMock}>Get data</button>
	    <p>{mock['nome_produto']}</p>
	    <p>{mock['valor']}</p>
	    <p>{mock['quantidade_vendas']}</p>
	    <p>{mock['codigo']}</p>
	    <p>{mock['descricao']}</p>
	</div>
    );
}

export default App;
