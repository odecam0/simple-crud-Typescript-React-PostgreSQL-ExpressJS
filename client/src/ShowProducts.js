import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function PaginationWidget (props) {
    // Turn sting props into numbers and
    // deal with even max_page prop
    const max_p = props.max_p%2===0 ? parseInt(props.max_p) + 1 : parseInt(props.max_p)
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
	    if (x === props.this_p) {
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
	    {props.this_p === 1 ?
	     <button className='InactiveButton'>Previous page</button> :
	     <button onClick={e=>props.goto_page(this_p - 1)}>Previous page</button>}
	    {buttons_list}
	    {props.this_p === props.total_p ?
	     <button className='InactiveButton'>Next page</button> :
	     <button onClick={e=>props.goto_page(this_p + 1)}>Next page</button>}

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
    const rows_per_page = props.rows_per_page ?
	  props.rows_per_page : 10;

    const [productsAmount, setProductsAmount] = useState(0);

    const [products, setProducts] = useState([])

    useEffect(() => {
	fetch('/api/amount_products')
	    .then(res => res.json())
	    .then(data => setProductsAmount(data.length))
	    .catch(err => console.error(err));

	goto_page(1)
    }, []);

    const n_pages = Math.ceil( productsAmount / rows_per_page );

    const [this_page, setThisPage] = useState(1);

    const ps = products.map(p => {
	return (<>
		    <tr>
			<td>{p.pname}</td>
			<td>{p.price}</td>
			<td>{p.amount_sold}</td>
			<td>{p.pid}</td>
			<td>{p.description}</td>
			<td>{p.quantity}</td>
		    </tr>
		</>);
    });

    function goto_page(x) {
	console.log(x);
	setThisPage(x);

	const first = (x-1) * rows_per_page;
	const last  = first + rows_per_page;

	fetch('/api/products_range', {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({'first': first, 'last': last}),
	})
	    .then(res => res.json())
	    .then(data => setProducts(data))
    }

    return(
	<div className={props.className}>
	    <PaginationWidget
		max_p={9}
		this_p={this_page}
	        total_p={n_pages}
	        goto_page={goto_page}/>
	    <table>
		<thead>
		    <tr>
			<th>Name</th>
			<th>Price</th>
			<th>Amount sold</th>
			<th>ID</th>
			<th>Description</th>
			<th>Quantity</th>
		    </tr>
		</thead>
		<tbody>
		    {ps}
		</tbody>
	    </table>
	</div>	
    );
}

export const StyledShowProducts = styled(ShowRangeOfProducts)`
    td, th {
        text-align: center;
        border: 1px solid black;
    }

    table {
        table-layout: fixed;
        width:100%;
    }
`
