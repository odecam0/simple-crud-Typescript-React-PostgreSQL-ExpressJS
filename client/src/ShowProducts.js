import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledPagination } from './PaginationWidget';
//@ts-ignore
import { StyledTable } from './TableStyle';
export const ShowRangeOfProducts = (props) => {
    const rows_per_page = props.rows_per_page ?
        props.rows_per_page : 10;
    const [productsAmount, setProductsAmount] = useState(0);
    const [products, setProducts] = useState([]);
    const goto_page = (x) => {
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
            .then((data) => setProducts(data))
            .catch(err => console.error(err));
    };
    useEffect(() => {
        fetch('/api/amount_products')
            .then(res => res.json())
            .then(data => setProductsAmount(data.length))
            .catch(err => console.error(err));
        goto_page(1);
    }, []);
    const n_pages = Math.ceil(productsAmount / rows_per_page);
    const [this_page, setThisPage] = useState(1);
    const ps = products.map((p, i) => {
        return (_jsxs("tr", { children: [_jsx("td", { children: p.pname }), _jsx("td", { children: p.price }), _jsx("td", { children: p.amount_sold }), _jsx("td", { children: p.pid }), _jsx("td", { children: p.description }), _jsx("td", { children: p.quantity })] }, i));
    });
    return (_jsxs("div", { className: props.className, children: [_jsx(StyledPagination, { max_p: 9, this_p: this_page, total_p: n_pages, goto_page: goto_page }), _jsx("div", { id: 'table-div', children: _jsxs(StyledTable, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: 'th1', children: "Name" }), _jsx("th", { className: 'th2', children: "Price" }), _jsx("th", { className: 'th3', children: "Amount sold" }), _jsx("th", { className: 'th4', children: "ID" }), _jsx("th", { className: 'th5', children: "Description" }), _jsx("th", { className: 'th6', children: "Quantity" })] }) }), _jsx("tbody", { children: ps })] }) })] }));
};
export const StyledShowProducts = styled(ShowRangeOfProducts) `
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
`;
