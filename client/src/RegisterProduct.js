import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
//@ts-ignore
import { baseFormStyle } from './StyledForm.js';
export const RegisterProductForm = (props) => {
    // const [data, setData] = useState<Product>({
    // 	"pname": "",
    // 	"price": 0,
    // 	"amount_sold": 0,
    // 	"pid": 0,
    // 	"description": "",
    // 	"quantity": 0
    // });
    const [pname, setPname] = useState('');
    const [price, setPrice] = useState('');
    const [amount_sold, setAmount_sold] = useState('');
    const [pid, setPid] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 	if (e.target.validity.valid) {
    // 		setData((data) => { return { ...data, [e.target.name]: e.target.value } });
    // 	}
    // };
    const regProd = (e) => {
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
        // setData({
        // 	"pname": "",
        // 	"price": 0,
        // 	"amount_sold": 0,
        // 	"pid": 0,
        // 	"description": "",
        // 	"quantity": 0,
        // });
    };
    return (_jsxs("form", { onSubmit: regProd, className: props.className, children: [_jsxs("label", { children: ["Product's name:", _jsx("input", { type: 'text', name: 'pname', value: pname, onChange: e => setPname(e.target.value) })] }), _jsx("br", {}), _jsxs("label", { children: ["Product's price:", _jsx("input", { type: 'number', name: 'price', pattern: "[0-9]*(\\.[0-9]+)?", value: price, onChange: e => e.target.validity && setPrice(e.target.value) })] }), _jsx("br", {}), _jsxs("label", { children: ["Amount of products sold:", _jsx("input", { type: 'number', name: 'amount_sold', pattern: "[0-9]*", value: amount_sold, onChange: e => e.target.validity && setAmount_sold(e.target.value) })] }), _jsx("br", {}), _jsxs("label", { children: ["Product's ID:", _jsx("input", { type: 'number', name: 'pid', pattern: "[0-9]*", value: pid, onChange: e => e.target.validity && setPid(e.target.value) })] }), _jsx("br", {}), _jsxs("label", { children: ["Product's description:", _jsx("input", { type: 'text', name: 'description', value: description, onChange: e => e.target.validity && setDescription(e.target.value) })] }), _jsx("br", {}), _jsx("input", { className: 'submit', type: 'submit', value: 'Submit' })] }));
};
export const StyledRegisterForm = styled(RegisterProductForm) `
	${baseFormStyle}
`;
