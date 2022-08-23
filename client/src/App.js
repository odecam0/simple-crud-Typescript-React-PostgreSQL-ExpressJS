import React, { useState } from 'react';
import './App.css';

import { Link, Routes, Route } from 'react-router-dom';

import styled from 'styled-components';

import { ModifyProduct } from './ModifyProduct.js';
// import { ShowRangeOfProducts } from './ShowProducts.js';
import { StyledShowProducts } from './ShowProducts.js';
import { RegisterProductForm } from './RegisterProduct.js';

function NavigationBar(props) {
    return (
	<div className={props.className}>
	    <Link to="/register_product">
		<button>Register Product</button>
	    </Link>
	    <Link to="/show_products">
		<button>Show Products</button>
	    </Link>
	    <Link to="/modify_products">
		<button>Modify Product</button>
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

    button {
        background-color: white;
        color: green;
        font-weight: bold;
        font-size: large;
        border-radius: 15px;
        padding: 1rem;
        border-color: green;
    }
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
		<Route path="/" element={<RegisterProductForm/>} />
		<Route path="/register_product" element={<RegisterProductForm/>} />
		<Route path="/show_products" element={<StyledShowProducts/>} />
		<Route path="/modify_products" element={<ModifyProduct/>} />
		<Route path="/debug" element={<Debug/>} />
	    </Routes>
	</div>
    );
}

export default App;
