import styled, { css } from 'styled-components';

export const StyledTableCSS = css`
    padding: 2rem;
    padding-top: 5rem;
    table-layout: fixed;
    border-collapse: collapse;
    width:100%;

    td, th {
        text-align: center;
        border-bottom: 1px solid green;
    }

    tr { height: 3rem; }

    td {
        word-break: break-all;
    }

    .th1 { width: 8rem; }
    .th2 { width: 4rem; }
    .th3 { width: 8rem; }
    .th4 { width: 5rem; }
    .th5 { width: 20rem; }
    .th6 { width: 5rem; }
`;

export const StyledTable = styled.table`
    ${StyledTableCSS}
`;
