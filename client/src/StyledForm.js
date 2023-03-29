import styled, { css } from 'styled-components';
import { StyledButtonCSS } from './StyledButton.js';

export const baseFormStyle = css`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: green;

    label {
        border: 2px solid green;
        border-radius: 10px;
        display: flex;
        flex-flow: column;
        padding: 2rem;
        align-items: center;
        font-weight: bold;
    }

    input {
        border: none;
        border-bottom: 1px solid green;
    }

    input.submit {
        ${StyledButtonCSS}
    }
`;

