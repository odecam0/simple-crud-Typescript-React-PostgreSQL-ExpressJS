import React, { ReactEventHandler, useState } from 'react';
import styled from 'styled-components';
//@ts-ignore
import { baseFormStyle } from './StyledForm.js';

interface ModifyProductState {
    pid_to_modify: number;
    pname: string;
    description: string;
    pid: number;
}

interface ModifyProductProps {
    className: string;
}

interface ModifyProductAPIResponse {
    status: number;
    message: string;
}

export const ModifyProduct: React.FC<ModifyProductProps> = (props) => {
    const [data, setData] = useState<ModifyProductState>({
        "pid_to_modify": 0,
        "pname": "",
        "description": "",
        "pid": 0,
    });

    const [pid_to_modify, setPid_to_modify] = useState('');
    const [pname, setPname] = useState('');
    const [description, setDescription] = useState('');
    const [pid, setPid] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(data => {
            return {
                ...data,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        }).catch((err) => console.error(err))

        setPid_to_modify('');
        setPname('');
        setDescription('');
        setPid('');
    }

    return (
        <form onSubmit={handleSubmit} className={props.className}>
            <label>
                ID of product to modify:
                <input type='number' name='pid_to_modify' pattern="[0-9]*" value={pid_to_modify} onChange={e => e.target.validity && setPid_to_modify(e.target.value)} />
            </label><br />
            <label>
                New product name:
                <input type='text' name='pname' value={pname}
                    onChange={e => setPname(e.target.value)} />
            </label><br />
            <label>
                New product description:
                <input type='text' name='description' value={description} onChange={e => setDescription(e.target.value)} />
            </label><br />
            <label>
                New product pid:
                <input type='number' pattern="[0-9]*" name='pid' value={pid} onChange={e => e.target.validity && setPid(e.target.value)} />
            </label><br />
            <input className='submit' type='submit' value='Update product' />
        </form>
    );
}

export const StyledModifyForm = styled(ModifyProduct)`
    ${baseFormStyle}       
`
