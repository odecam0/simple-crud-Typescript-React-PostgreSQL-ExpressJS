import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { StyledPagination } from './PaginationWidget';

//@ts-ignore
import { StyledTable } from './TableStyle';

import { Product } from './CustomTypes';

interface ShowRangeOfProductsProps {
    rows_per_page: number | undefined ;
    className: string;
}

export const ShowRangeOfProducts : React.FC<ShowRangeOfProductsProps> = (props) => {
    const rows_per_page : number = props.rows_per_page ?
      props.rows_per_page : 10;

    const [productsAmount, setProductsAmount] = useState<number>(0);

    const [products, setProducts] = useState<Product[]>([])

    const goto_page = (x: number): void => {
        console.log(x);
        setThisPage(x);

        const first = (x - 1) * rows_per_page;
        const last = first + rows_per_page;

        fetch('/api/products_range', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'first': first, 'last': last }),
        })
            .then(res => res.json())
            .then((data: Product[]) => setProducts(data))
            .catch(err => console.error(err))
    }

    useEffect(() => {
    fetch('/api/amount_products')
        .then(res => res.json())
        .then(data => setProductsAmount(data.length))
        .catch(err => console.error(err));

    goto_page(1)
    }, []);

    const n_pages : number = Math.ceil( productsAmount / rows_per_page );

    const [this_page, setThisPage] = useState<number>(1);

    const ps = products.map((p, i) => {
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

    return(
    <div className={props.className}>
        <StyledPagination
        max_p={9}
        this_p={this_page}
            total_p={n_pages}
            goto_page={goto_page}/>
        <div id='table-div'>
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
            {ps}
            </tbody>
        </StyledTable>
        </div>
    </div>
    );
}

export const StyledShowProducts = styled(ShowRangeOfProducts)`
    height: 100%;
    display: flex;
    flex-flow: column;
    padding-top: 3rem;

    #table-div {
        flex-grow: 2;
    display: flex;
    flex-direction: column;
    justify-content: start;
    height: 100%;
    }
`
