import React, { useState } from 'react';
import styled from 'styled-components';

//@ts-ignore
import { baseFormStyle } from './StyledForm.js';

import { Product } from './CustomTypes';

interface RegisterProductProps {
	className: string;
}

export const RegisterProductForm: React.FC<RegisterProductProps> = (props) => {

	const [pname, setPname] = useState('');
	const [price, setPrice] = useState('');
	const [amount_sold, setAmount_sold] = useState('');
	const [pid, setPid] = useState('');
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState('');

	const regProd = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		fetch('/api/register_product', {
			method: 'POST',
			cache: 'no-store',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				pname: pname,
				price: Number(price),
				amount_sold: Number(amount_sold),
				pid: Number(pid),
				description: description,
				quantity: Number(quantity)
			}),
		}).catch(err => console.error(err));

		setPname('');
		setPrice('');
		setAmount_sold('');
		setPid('');
		setDescription('');
		setQuantity('');
	}

	return (
		<form onSubmit={regProd}>
			<label>
				{"Product's name:"}
				<input
					type='text'
					name='pname'
					value={pname}
					onChange={e => setPname(e.target.value)} />
			</label>
			<label>
				{"Product's price:"}
				<input
					type='number'
					name='price'
					pattern="[0-9]*(\.[0-9]+)?"
					value={price}
					onChange={e => e.target.validity && setPrice(e.target.value) } />
			</label>
			<label>
				Amount of products sold:
				<input
					type='number'
					name='amount_sold'
					pattern="[0-9]*"
					value={amount_sold}
					onChange={e => e.target.validity && setAmount_sold(e.target.value)} />
			</label>
			<label>
				{"Product's ID:"}
				<input
					type='number'
					name='pid'
					pattern="[0-9]*"
					value={pid}
					onChange={e => e.target.validity && setPid(e.target.value)} />
			</label>
			<label>
				{"Product's description:"}
				<input
					type='text'
					name='description'
					value={description}
					onChange={e => e.target.validity && setDescription(e.target.value)} />
			</label>
			<input className='submit' type='submit' value='Submit' />
		</form>
	);
}

