import React, { useState } from 'react';

function PaginationWidget (props) {
    // Turn sting props into numbers and
    // deal with even max_page prop
    const max_p = props.max_p%2==0 ? parseInt(props.max_p) + 1 : parseInt(props.max_p)
    const limit = parseInt(max_p/2);
    const total_p = parseInt(props.total_p);
    const this_p = parseInt(props.this_p);
    let pages_numbers = [];
    
    // Defining page numbers to be shown
    if (total_p > max_p) {
	if ( this_p <= limit ) {
	    // pages_numbers = [1, 2, ..., max_p]
	    for (let i=1; i<=max_p; i++) {
		pages_numbers.push(i);
	    }
	} else if ( this_p <= total_p - limit ) {
	// (this_p > max_p/2) && this_p (<= total_p - max_p/2)
	    for (let i=this_p-limit; i<= this_p+limit; i++) {
		pages_numbers.push(i);
	    }
	} else {
	// this_p > total_p - max_p/2
	    for (let i=total_p-(max_p-1); i<=total_p; i++) {
		pages_numbers.push(i);
	    }
	}
    } else {
	for (let i=1; i<=total_p; i++) {
	    pages_numbers.push(i);
	}
    }

    // Turn page numbers into buttons
    const buttons_list = pages_numbers.map(
	(x) => {
	    if (x == props.this_p) {
		return (<button
			    className='SelectedButton'
			    key={x}
			    onClick={e=>props.goto_page(x)}>
			    {x}
			</button>);
	    } else {
		return (<button
			    onClick={e=>props.goto_page(x)}
			    key={x}>
			    {x}
			</button>);
	    }
	}
    )

    // Deal with Goto page functionality
    const [goto_page, setGotoPage] = useState("");
    function gotoPageSubmit(e) {
	e.preventDefault();
	props.goto_page(parseInt(goto_page));
	setGotoPage("");
    }

    return (
	<div>
	    {props.this_p == 1 ?
	     <button className='InactiveButton'>Previous page</button> :
	     <button>Previous page</button>}
	    {buttons_list}
	    {props.this_p == props.total_p ?
	     <button className='InactiveButton'>Next page</button> :
	     <button>Next page</button>}
	    <p>Total number of pages: {props.total_p}</p>
	    <form onSubmit={gotoPageSubmit}>
		<label>
		    Goto page:
		    <input
			type='text'
			value={goto_page}
			onChange={(e)=>setGotoPage(e.target.value)}/>
		</label>
		<input type='submit' value='Go'/>
	    </form>
	</div>
    );
}

export function ShowRangeOfProducts (props) {
    const [data, setData] = useState({
	"first": 0,
	"last": 0
    });

    const [products, setProducts] = useState([])

    function handleChange (e) {
	setData((data) => {
	    return {...data, [e.target.name]: e.target.value}
	});
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

    const [p_data, setPData] = useState({
	'max_p': 10,
	'this_p': 1,
	'total_p': 20,
    });

    function handleChange2(e) {
	setPData((data) => {
	    return {...data, [e.target.name]: e.target.value}
	});
    }

    function goto_page(x) {
	console.log(x);
    }

    return(
	<div>
	    <ProductList products={products}/>
	    <PaginationWidget
		max_p={p_data.max_p}
		this_p={p_data.this_p}
	        total_p={p_data.total_p}
	        goto_page={goto_page}/>
	    <form>
		<label>
		    max_p:
		    <input
			type='number'
			name='max_p'
			value={p_data.max_p}
			onChange={handleChange2}/>
		</label>
		<label>
		    this_p:
		    <input
			type='number'
			name='this_p'
			value={p_data.this_p}
			onChange={handleChange2}/>
		</label>
		<label>
		    total_p:
		    <input
			type='number'
			name='total_p'
			value={p_data.total_p}
			onChange={handleChange2}/>
		</label>
	    </form>

	    <form onSubmit={handleSubmit}>
		<label>
		    First product index:
		    <input
			type='number'
			name='first'
			value={data.first}
			onChange={handleChange}/>
		</label>
		<label>
		    Last product index:
		    <input
			type='number'
			name='last'
			value={data.last}
			onChange={handleChange}/>
		</label>
		<input type='submit' value='Get products'/>
	    </form>
	</div>	
    );
}
