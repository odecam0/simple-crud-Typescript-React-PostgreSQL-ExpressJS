import React, { useState } from 'react';
import './App.css';

import { Link, Routes, Route } from 'react-router-dom';

import { ModifyProduct } from './ModifyProduct.js';
import { ShowRangeOfProducts } from './ShowProducts.js';
import { RegisterProductForm } from './RegisterProduct.js';

function NavigationBar(props) {
    return (
	<div >
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


function App(props) {
    return (
	<div className="App">
	    <NavigationBar/>
	    <Routes>
		<Route path="/" element={<RegisterProductForm/>} />
		<Route path="/register_product" element={<RegisterProductForm/>} />
		<Route path="/show_products" element={<ShowRangeOfProducts/>} />
		<Route path="/modify_products" element={<ModifyProduct/>} />
	    </Routes>
	</div>
    );
}

export default App;
