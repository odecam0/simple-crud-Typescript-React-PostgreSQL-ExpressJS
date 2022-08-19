import React, { useState } from 'react';

export function ModifyProduct (props) {
    const [data, setData] = useState({
	"pid_to_modify": "",
	"pname": "",
	"description": "",
	"pid": "",
    });

    function handleChange (e) {
	setData(data => {return {
	    ...data,
	    [e.target.name]: e.target.value
	}});
    }

    function handleSubmit (e) {
	e.preventDefault();

	fetch('/api/update_product', {
	    method: 'POST',
	    headers: {
		'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(data),
	}).catch(err => console.error(err))
    }

    return (
	<form onSubmit={handleSubmit}>
	    <label>
		ID of product to modify:
		<input text='text' name='pid_to_modify' value={data.pid_to_modify} onChange={handleChange}/>
	    </label><br/>
	    <label>
		New product name:
		<input text='text' name='pname' value={data.pname} onChange={handleChange}/>
	    </label><br/>
	    <label>
		New product description:
		<input text='text' name='description' value={data.description} onChange={handleChange}/>
	    </label><br/>
	    <label>
		New product pid:
		<input text='text' name='pid' value={data.pid} onChange={handleChange}/>
	    </label><br/>
	    <input type='submit' value='Update product'/>
	</form>
    );
}
