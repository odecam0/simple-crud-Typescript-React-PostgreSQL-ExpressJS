import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
//@ts-ignore
import { baseFormStyle } from './StyledForm.js';
export const ModifyProduct = (props) => {
    const [data, setData] = useState({
        "pid_to_modify": 0,
        "pname": "",
        "description": "",
        "pid": 0,
    });
    const [pid_to_modify, setPid_to_modify] = useState('');
    const [pname, setPname] = useState('');
    const [description, setDescription] = useState('');
    const [pid, setPid] = useState('');
    const handleChange = (e) => {
        setData(data => {
            return {
                ...data,
                [e.target.name]: e.target.value
            };
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/update_product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pid_to_modify: pid_to_modify,
                pname: pname,
                description: description,
                pid: pid
            }),
        }).catch((err) => console.error(err));
        setPid_to_modify('');
        setPname('');
        setDescription('');
        setPid('');
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: props.className, children: [_jsxs("label", { children: ["ID of product to modify:", _jsx("input", { type: 'number', name: 'pid_to_modify', pattern: "[0-9]*", value: pid_to_modify, onChange: e => e.target.validity && setPid_to_modify(e.target.value) })] }), _jsx("br", {}), _jsxs("label", { children: ["New product name:", _jsx("input", { type: 'text', name: 'pname', value: pname, onChange: e => setPname(e.target.value) })] }), _jsx("br", {}), _jsxs("label", { children: ["New product description:", _jsx("input", { type: 'text', name: 'description', value: description, onChange: e => setDescription(e.target.value) })] }), _jsx("br", {}), _jsxs("label", { children: ["New product pid:", _jsx("input", { type: 'number', pattern: "[0-9]*", name: 'pid', value: pid, onChange: e => e.target.validity && setPid(e.target.value) })] }), _jsx("br", {}), _jsx("input", { className: 'submit', type: 'submit', value: 'Update product' })] }));
};
export const StyledModifyForm = styled(ModifyProduct) `
    ${baseFormStyle}       
`;
