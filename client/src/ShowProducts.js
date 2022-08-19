import React, { useState } from 'react';

export function ShowRangeOfProducts (props) {

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
	    return (<li key={p.pid}>
			{p.pname+','
			 +p.price+','
			 +p.amount_sold+','
			 +p.pid+','
			 +p.description+','
			 +p.quantity}
		       <br/>
		    </li>);
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
