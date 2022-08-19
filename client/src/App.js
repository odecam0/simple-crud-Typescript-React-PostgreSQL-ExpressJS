import React, { useState } from 'react';
import './App.css';

function ShowRangeOfProducts (props) {

    const [data, setData] = useState({
	"first": 0,
	"last": 0
    });

    const [products, setProducts] = useState([])

    function handleChange (e) {
	setData((data) => {return {...data, [e.target.name]: e.target.value}});
    }

    function handleSubmit (e) {
	e.preventDefault();

	fetch('/api/products_range', {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(data),
	})
	    .then(res => res.json())
	    .then(data => setProducts(data))
    }

    function ProductList(props) {
	const ps = props.products.map(p => {
	    return <li key={p.pid}>{p.pname+','+p.price+','+p.amount_sold+','+p.pid+','+p.description+','+p.quantity}<br/></li>
	});
	return <ul>{ps}</ul>;
    }

    return(
	<div>
	    <ProductList products={products}/>
	    <form onSubmit={handleSubmit}>
		<label>
		    First product index:
		    <input type='number' name='first' value={data.first} onChange={handleChange}/>
		</label>
		<label>
		    Last product index:
		    <input type='number' name='last' value={data.last} onChange={handleChange}/>
		</label>
		<input type='submit' value='Get products'/>
	    </form>
	</div>	
    );
}

function RegisterProductForm (props) {

    const [data, setData] = useState({
	"pname": "",
	"price": "",
	"amount_sold": "",
	"pid": "",
	"description": "",
    });

    function handleChange(e) {
	setData((data) => {return {...data, [e.target.name]: e.target.value }});
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
	    <ShowRangeOfProducts/>
	</div>
    );
}

export default App;
