import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
//@ts-ignore
import { StyledTable } from './TableStyle.js';
const StyledText = styled.p `
    font-weight: bold;
    padding-left: 2rem;
    padding-top: 2rem;
`;
export const HighestAmount = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('/api/most_in_stock')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);
    const p_list = products.map((p, i) => {
        return (_jsxs("tr", { children: [_jsx("td", { children: p.pname }), _jsx("td", { children: p.price }), _jsx("td", { children: p.amount_sold }), _jsx("td", { children: p.pid }), _jsx("td", { children: p.description }), _jsx("td", { children: p.quantity })] }, i));
    });
    return (_jsxs(_Fragment, { children: [_jsx(StyledText, { children: "Here are the 3 products with highest amount in stock:" }), _jsxs(StyledTable, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: 'th1', children: "Name" }), _jsx("th", { className: 'th2', children: "Price" }), _jsx("th", { className: 'th3', children: "Amount sold" }), _jsx("th", { className: 'th4', children: "ID" }), _jsx("th", { className: 'th5', children: "Description" }), _jsx("th", { className: 'th6', children: "Quantity" })] }) }), _jsx("tbody", { children: p_list })] })] }));
};
