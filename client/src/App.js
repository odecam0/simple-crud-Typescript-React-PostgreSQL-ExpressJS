import React, { useState } from 'react';
import './App.css';

import { Link, Routes, Route } from 'react-router-dom';

import styled from 'styled-components';
import StyledButton from './StyledButton.js'

import { StyledModifyForm } from './ModifyProduct.js';
import { StyledShowProducts } from './ShowProducts.js';
import { StyledRegisterForm } from './RegisterProduct.js';

function NavigationBar(props) {
    return (
	<div className={props.className}>
	    <Link to="/register_product">
		<StyledButton>Register Product</StyledButton>
	    </Link>
	    <Link to="/show_products">
		<StyledButton>Show Products</StyledButton>
	    </Link>
	    <Link to="/modify_products">
		<StyledButton>Modify Product</StyledButton>
	    </Link>
	</div>
    );
}


const StyledNavigationBar = styled(NavigationBar)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-top: 1rem;
    padding-left: 3rem;
    padding-right: 3rem;
`

function Debug(props) {
    function randomChars(length) {
	let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result = '';

	for (let i=0; i<=length; i++) {
	    result += chars[Math.floor(Math.random() * chars.length)];
	}

	return result;
    }

    function randomInt(max) {
	return Math.floor(Math.random() * max);
    }

    function add100() {
	for (let i=0; i<=100; i++){
	    fetch('/api/register_product', {
		method: 'POST',
		cache: 'no-store',
		headers: {
		    'Content-Type': 'application/json',
		},
		body: JSON.stringify({
		    "pname": randomChars(10),
		    "price": randomInt(1000),
		    "amount_sold": randomInt(10),
		    "pid": randomInt(10000),
		    "description": randomChars(50),
		}),
	    }).catch(err => console.error(err));
	}
    }

    return(
	<>
	    <button onClick={add100}>add 100 entries</button>
	</>
    );
}

function App(props) {
    return (
	<div className="App">
	    <StyledNavigationBar/>
	    <Routes>
		<Route path="/" element={<StyledRegisterForm/>} />
		<Route path="/register_product" element={<StyledRegisterForm/>} />
		<Route path="/show_products" element={<StyledShowProducts/>} />
		<Route path="/modify_products" element={<StyledModifyForm/>} />
		<Route path="/debug" element={<Debug/>} />
	    </Routes>
	</div>
    );
}

export default App;
