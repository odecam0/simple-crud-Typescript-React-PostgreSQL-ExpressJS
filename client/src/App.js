import React, { useState } from 'react';
import './App.css';

function RegisterProductForm (props) {

    const [data, setData] = useState({
	"pname": "",
	"price": "",
	"amount_sold": "",
	"pid": "",
	"description": "",
    });

    function handleChange(e) {
	setData({...data, [e.target.name]: e.target.value });
    };

    function regProd(e) {
	e.preventDefault();
	fetch('/api/register_product', {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(data),
	}).catch(err => console.error(err));

	setData({
	    "pname": "",
	    "price": "",
	    "amount_sold": "",
	    "pid": "",
	    "description": "",
	});
    }

    return (
	<form onSubmit={regProd}>
	    <label>
		Product's name:
		<input
		    type='text'
		    name='pname'
		    value={data.pname}
		    onChange={handleChange} />
		</label>
		<br/>
		<label>
		    Product's price:
		    <input
			type='text'
			name='price'
			value={data.price}
			onChange={handleChange}/>
		    </label>
		    <br/>
		    <label>
			Amount of products sold:
			<input
			    type='text'
			    name='amount_sold'
			    value={data.amount_sold}
			    onChange={handleChange}/>
		    </label>
		    <br/>
		    <label>
			Product's ID:
			<input
			    type='text'
			    name='pid'
			    value={data.pid}
			    onChange={handleChange}/>
			</label>
			<br/>
			<label>
			    Product's description:
			    <input
				type='text'
				name='description'
				value={data.description}
				onChange={handleChange}/>
			</label>
	    <br/>
	    <input type='submit' value='Submit'/>
	</form>
    );
}

function App(props) {
    return (
	<div className="App">
	   <RegisterProductForm/> 
	</div>
    );
}

export default App;
