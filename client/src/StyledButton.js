import styled, { css } from 'styled-components';

export const StyledButtonCSS = css`
    background-color: white;
    color: green;
    font-weight: bold;
    font-size: large;
    border-radius: 15px;
    padding: 1rem;
    border: 2px solid green;

    :hover {
        background-color: green;
        color: white;
    }
`

const StyledButton = styled.button`
    ${StyledButtonCSS}
`

export default StyledButton;
