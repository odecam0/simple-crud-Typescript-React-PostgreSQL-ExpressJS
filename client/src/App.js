import React, { useState } from 'react';
import './App.css';

import { ModifyProduct } from './ModifyProduct.js';
import { ShowRangeOfProducts } from './ShowProducts.js';
import { RegisterProductForm } from './RegisterProduct.js';

function App(props) {
    return (
	<div className="App">
	   <RegisterProductForm/> 
	    <ShowRangeOfProducts/>
	    <ModifyProduct/>
	</div>
    );
}

export default App;
