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
    margin-top: 3rem;
    margin-bottom: 3rem;
    margin-left: 8rem;
    margin-right: 8rem;

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

function App(props) {
    return (
	<div className="App">
	    <StyledNavigationBar/>
	    <Routes>
		<Route path="/" element={<RegisterProductForm/>} />
		<Route path="/register_product" element={<RegisterProductForm/>} />
		<Route path="/show_products" element={<StyledShowProducts/>} />
		<Route path="/modify_products" element={<ModifyProduct/>} />
	    </Routes>
	</div>
    );
}

export default App;
