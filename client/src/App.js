import React, { useState } from 'react';
import './App.css';

import { Link, Routes, Route } from 'react-router-dom';

import styled from 'styled-components';
import StyledButton from './StyledButton.js'

import { StyledModifyForm } from './ModifyProduct.js';
import { StyledShowProducts } from './ShowProducts.js';
import { StyledRegisterForm } from './RegisterProduct.js';

import { ExpensiveProducts } from './ExpensiveProducts';
import { HighestAmount } from './MostInStock.js';

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
	    <Link to="/expensive_products">
		<StyledButton>Most Expensive Products</StyledButton>
	    </Link>
	    <Link to="/most_in_stock">
		<StyledButton>Highest amount in stock</StyledButton>
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
    flex-shrink: 1;
`

const StyledMainDiv = styled("div")`
    display: flex;
    overflow: hidden;
`

function App(props) {
    return (
	<StyledMainDiv className="App">
	    <StyledNavigationBar/>
	    <Routes>
		<Route path="/" element={<StyledRegisterForm/>} />
		<Route path="/register_product" element={<StyledRegisterForm/>} />
		<Route path="/show_products" element={<StyledShowProducts/>} />
		<Route path="/modify_products" element={<StyledModifyForm/>} />
		<Route path="/expensive_products" element={<ExpensiveProducts/>} />
		<Route path="/most_in_stock" element={<HighestAmount/>} />
	    </Routes>
	</StyledMainDiv>
    );
}

export default App;
