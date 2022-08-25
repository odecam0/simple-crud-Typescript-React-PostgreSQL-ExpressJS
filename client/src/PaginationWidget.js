import React, { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
        background-color: ${props => props.selected ? 'green' : 'white'};
        border-color: ${props => props.inactive ? 'grey' : 'green'};
        color:        ${props => props.inactive ? 'grey' :
                                                   props.selected ? 'white' :
                                                                   'green'};
        border-radius: 10px;
        font-size: large;
        font-weight: bold;
`

function PaginationWidget (props) {
    // Turn sting props into numbers and
    // deal with even max_page prop
    const max_p = props.max_p%2===0 ? parseInt(props.max_p) + 1 : parseInt(props.max_p)
    const limit = parseInt(max_p/2);
    const total_p = parseInt(props.total_p);
    const this_p = parseInt(props.this_p);
    let pages_numbers = [];
    
    // Defining page numbers to be shown
    if (total_p > max_p) {
	if ( this_p <= limit ) {
	    // pages_numbers = [1, 2, ..., max_p]
	    for (let i=1; i<=max_p; i++) {
		pages_numbers.push(i);
	    }
	} else if ( this_p <= total_p - limit ) {
	// (this_p > max_p/2) && this_p (<= total_p - max_p/2)
	    for (let i=this_p-limit; i<= this_p+limit; i++) {
		pages_numbers.push(i);
	    }
	} else {
	// this_p > total_p - max_p/2
	    for (let i=total_p-(max_p-1); i<=total_p; i++) {
		pages_numbers.push(i);
	    }
	}
    } else {
	for (let i=1; i<=total_p; i++) {
	    pages_numbers.push(i);
	}
    }

    // Turn page numbers into buttons
    const buttons_list = pages_numbers.map(
	(x) => {
	    if (x === props.this_p) {
		return (<StyledButton
			    selected
			    className='number'
			    key={x}
			    onClick={e=>props.goto_page(x)}>
			    {x}
			</StyledButton>);
	    } else {
		return (<StyledButton
			    className='number'
			    onClick={e=>props.goto_page(x)}
			    key={x}>
			    {x}
			</StyledButton>);
	    }
	}
    )

    // Deal with Goto page functionality
    const [goto_page, setGotoPage] = useState("");
    function gotoPageSubmit(e) {
	e.preventDefault();
	props.goto_page(parseInt(goto_page));
	setGotoPage("");
    }

    return (
	<div className={props.className}>
	    <div className='pages'>
		{props.this_p === 1 ?
		 <StyledButton inactive>Previous page</StyledButton> :
		 <StyledButton onClick={e=>props.goto_page(this_p - 1)}>Previous page</StyledButton>}
		{buttons_list}
		{props.this_p === props.total_p ?
		 <StyledButton inactive>Next page</StyledButton> :
		 <StyledButton onClick={e=>props.goto_page(this_p + 1)}>Next page</StyledButton>}
	    </div>

	    <p>Pages: {props.total_p}</p>

	    <form onSubmit={gotoPageSubmit}>
		<label>
		    Goto page:
		    <input
			type='text'
			value={goto_page}
			onChange={(e)=>setGotoPage(e.target.value)}/>
		</label>
		<input type='submit' value='Go'/>
	    </form>
	</div>
    );
}

export const StyledPagination = styled(PaginationWidget)`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding-left: 3rem;
    padding-right: 3rem;
    gap: 0.2rem;
    color: green;
    font-weight: bold;
    font-size: medium;

    input {
        width: 50px;
        border-color: green;
        border-radius: 10px;
        background-color: white;
        text-align: center;
        color: green;
        font-weight: bold;
    }

    form {
        display: flex;
        gap: 0.2rem;
    }

    button.number {
        width: 2rem;
    }

    .pages {
        display: flex;
        justify-content: center;
        gap: 0.25rem;
    }
`
