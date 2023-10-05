import React, { useState } from 'react';
import './App.css';

import { Link, Routes, Route } from 'react-router-dom';

import styled from 'styled-components';
import StyledButton from './StyledButton.js'

import { ModifyProduct } from './ModifyProduct.js';
import { ShowRangeOfProducts } from './ShowProducts.js';
import { RegisterProductForm } from './RegisterProduct.js';

import { ExpensiveProducts } from './ExpensiveProducts';
import { HighestAmount } from './MostInStock.js';

function NavigationBar(props) {
    return (
	<nav >
	    <ul>
		<li>
		    <Link to="/register_product">
			<button>Register Product</button>
		    </Link>
		</li>
		<li>
		    <Link to="/show_products">
			<button>Show Products</button>
		    </Link>
		</li>
		<li>
		    <Link to="/modify_products">
			<button>Modify Product</button>
		    </Link>
		</li>
		<li>
		    <Link to="/expensive_products">
			<button>Most Expensive Products</button>
		    </Link>
		</li>
		<li>
		    <Link to="/most_in_stock">
			<button>Highest amount in stock</button>
		    </Link>
		</li>
	    </ul>
	</nav>
    );
}

function App(props) {
    return (
	<div className="App">
	    <NavigationBar/>
	    <Routes>
		<Route path="/" element={<RegisterProductForm/>} />
		<Route path="/register_product" element={<RegisterProductForm/>} />
		<Route path="/show_products" element={<ShowRangeOfProducts/>} />
		<Route path="/modify_products" element={<ModifyProduct/>} />
		<Route path="/expensive_products" element={<ExpensiveProducts/>} />
		<Route path="/most_in_stock" element={<HighestAmount/>} />
	    </Routes>
	</div>
    );
}

export default App;
