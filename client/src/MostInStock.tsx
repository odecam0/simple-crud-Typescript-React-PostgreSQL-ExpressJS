import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

//@ts-ignore
import { StyledTable } from './TableStyle.js';

const StyledText = styled.p`
    font-weight: bold;
    padding-left: 2rem;
    padding-top: 2rem;
`;

import { Product } from './CustomTypes'

export const HighestAmount = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
	fetch('/api/most_in_stock')
	    .then(res => res.json())
	    .then(data => setProducts(data))
	    .catch(err => console.error(err))
    }, []);

    const p_list = products.map((p, i) => {
	return (
		<tr key={i}>
		    <td>{p.pname}</td>
		    <td>{p.price}</td>
		    <td>{p.amount_sold}</td>
		    <td>{p.pid}</td>
		    <td>{p.description}</td>
		    <td>{p.quantity}</td>
		</tr>
	);
    });

    return (
	<>
	    <StyledText>Here are the 3 products with highest amount in stock:</StyledText>
	    <StyledTable>
		<thead>
		    <tr>
			<th className='th1'>Name</th>
			<th className='th2'>Price</th>
			<th className='th3'>Amount sold</th>
			<th className='th4'>ID</th>
			<th className='th5'>Description</th>
			<th className='th6'>Quantity</th>
		    </tr>
		</thead>
		<tbody>
		    {p_list}
		</tbody>
	    </StyledTable>
	</>
    );
}
