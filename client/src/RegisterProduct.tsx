import React, { useState } from 'react';
import styled from 'styled-components';
import { baseFormStyle } from './StyledForm.js';

import { Product } from './CustomTypes';

interface RegisterProductProps {
    className: string;
}

export const RegisterProductForm : React.FC<RegisterProductProps> = (props) => {

    const [data, setData] = useState<Product>({
	"pname": "",
	"price": 0,
	"amount_sold": 0,
	"pid": 0,
	"description": "",
	"quantity": 0
    });

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
	setData((data) => {return {...data, [e.target.name]: e.target.value }});
    };

    const regProd = (e : React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	fetch('/api/register_product', {
	    method: 'POST',
	    cache: 'no-store',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(data),
	}).catch(err => console.error(err));

	setData({
	    "pname": "",
	    "price": 0,
	    "amount_sold": 0,
	    "pid": 0,
	    "description": "",
	    "quantity": 0,
	});
    }

    return (
	<form onSubmit={regProd} className={props.className}>
	    <label>
		{"Product's name:"}
		<input
		    type='text'
		    name='pname'
		    value={data.pname}
		    onChange={handleChange}/>
	    </label>
	    <br/>
	    <label>
		{"Product's price:"}
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
		{"Product's ID:"}
		<input
		    type='text'
		    name='pid'
		    value={data.pid}
		    onChange={handleChange}/>
	    </label>
	    <br/>
	    <label>
		{"Product's description:"}
		<input
		    type='text'
		    name='description'
		    value={data.description}
		    onChange={handleChange}/>
	    </label>
	    <br/>
	    <input className='submit' type='submit' value='Submit'/>
	</form>
    );
}

export const StyledRegisterForm = styled(RegisterProductForm)`
    ${baseFormStyle}
`;
