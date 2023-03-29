import React, { ReactEventHandler, useState } from 'react';
import styled from 'styled-components';
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

// interface ModifyProductEvent extends

export const ModifyProduct : React.FC<ModifyProductProps> = (props) => {
    const [data , setData] = useState<ModifyProductState>({
	"pid_to_modify": 0,
	"pname": "",
	"description": "",
	"pid": 0,
    });

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
	setData(data  => {return {
	    ...data,
	    [e.target.name]: e.target.value
	}});
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	fetch('/api/update_product', {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(data),
	}).catch((err) => console.error(err))

	setData({
	    "pid_to_modify": 0,
	    "pname": "",
	    "description": "",
	    "pid": 0,
	});
    }

    return (
	<form onSubmit={handleSubmit} className={props.className}>
	    <label>
		ID of product to modify:
		<input type='text' name='pid_to_modify' value={data.pid_to_modify} onChange={handleChange}/>
	    </label><br/>
	    <label>
		New product name:
	    <input type='text' name='pname' value={data.pname}
	onChange={handleChange}/>
	    </label><br/>
	    <label>
		New product description:
		<input type='text' name='description' value={data.description} onChange={handleChange}/>
	    </label><br/>
	    <label>
		New product pid:
		<input type='text' name='pid' value={data.pid} onChange={handleChange}/>
	    </label><br/>
	    <input className='submit' type='submit' value='Update product'/>
	    </form>
    );
}

export const StyledModifyForm = styled(ModifyProduct)`
    ${ baseFormStyle }       
`
