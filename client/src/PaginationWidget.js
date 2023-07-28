import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
const StyledButton = styled.button `
        background-color: ${(props) => props.selected ? 'green' : 'white'};
        border-color: ${(props) => props.inactive ? 'grey' : 'green'};
        color:        ${(props) => props.inactive ? 'grey' :
    props.selected ? 'white' :
        'green'};
        border-radius: 10px;
        font-size: large;
        font-weight: bold;
`;
const PaginationWidget = (props) => {
    // An even max_page prop is problematic ?!
    const max_p = props.max_p % 2 === 0 ? props.max_p + 1 : props.max_p;
    const limit = Math.floor(max_p / 2);
    const total_p = props.total_p;
    const this_p = props.this_p;
    let pages_numbers = [];
    // Defining page numbers to be shown
    // Existem 3 casos que podem ocorrer caso haja uma quantidade maior de páginas
    // que o limite de quantidade de páginas que podem ser exibidas no widget.
    // No primeiro caso, a página atual estará próxima à margem esquerda do widget
    // com as páginas, ou seja, estará mais próxima da primeira página.
    // No segundo caso, a página estará distante tanto da margem esquerda quanto da
    // margem direita, sendo exibida no centro do widget, e tanto na esquerda quanto
    // na direita algumas páginas não serão exibidas, para caberem na quantidade máxima
    // de páginas exibidas.
    // No terceiro caso a página atual estará próxima à margem da direita.
    //
    // Lidar com estes casos é importante pois no segundo caso escolher quais páginas
    // serão exibidas como botões é trivial, basta exibir metade à esquerda da página
    // atual e metade à direita. Porém nos outros casos, não há páginas disponíveis
    // para preencher esta quantidade de páginas à esquerda ou direita, caso a página
    // atual fosse ser exibida no centro do widget como no caso trivial, teriamos valores
    // para páginas que não existem, como no exemplo a seguir:
    //
    // Suponha que o máximo de páginas que pode ser exibido é 5, a quantidade total de
    // páginas é 10 e a página atual é 6.
    //     
    //                     1 2 3 4 5 6 7 8 9 10     <- Este é um caso trivial
    //                     X X X     |     X  X
    //
    //                          4 5 |6| 7 8         <- Serão exibidos a página atual
    //                                                 Metade do restante à direita
    //                                                 e a outra metade à esquerda
    //
    // Agora supondo que a página atual é 2.
    //
    //                     1 2 3 4 5 6 7 8 9 10     <- Este é um caso não trivial
    //                       |     X X X X X X
    //
    //                  0 1 |2| 3 4                 <- Se utilizassemos a mesma lógica
    //                                                 do caso trivial, o resultado possuiria
    //                                                 a página 0, que não existe.
    //
    //                    1 |2| 3 4 5               <- O correto seria exibir mais à direita que à
    //                                                 esquerda
    //
    // Supondo que a página atual é 1.
    //
    //                     1 2 3 4 5 6 7 8 9 10     <- Este é um caso não trivial
    //                     |     X X X X X X X
    //
    //               -1 0 |1| 2 3                   <- Páginas -1 e 0 não existem!
    //
    //                    |1| 2 3 4 5               <- Correto
    //
    // Supondo que a página atual seja 10
    //
    //                     1 2 3 4 5 6 7 8 9 10     <- Este é um caso não trivial
    //                     X X X X X X X     |
    //
    //                                  8 9 |10| 11 12     <- Página 11 e 12 não existem!
    //
    //                              6 7 8 9 |10|    <- Correto
    // 
    // Desta forma a variável LIMIT define qual o limite pela esquerda e direita
    // que separam o caso trivial dos casos não triviais. No caso trivial inclui-se
    // na lista de páginas a serem desenhadas, da página (THIS_P - LIMIT) até (THIS_P + LIMIT).
    // Enquanto nos casos não triviais, quando THIS_P é menor que LIMIT, inclui-se da
    // primeira página até MAX_P, e quando THIS_P é maior que (TOTAL_P - LIMIT) inclui-se de
    // (TOTAL_P - MAX_P) até TOTAL_P
    if (total_p > max_p) { // In case there are more pages then waht can be shown
        if (this_p <= limit) {
            // pages_numbers = [1, 2, ..., max_p]
            for (let i = 1; i <= max_p; i++) {
                pages_numbers.push(i);
            }
            pages_numbers.push('...');
        }
        else if (this_p <= total_p - limit) {
            // (this_p > max_p/2) && this_p (<= total_p - max_p/2)
            pages_numbers.push('...');
            for (let i = this_p - limit; i <= this_p + limit; i++) {
                pages_numbers.push(i);
            }
            pages_numbers.push('...');
        }
        else {
            // this_p > total_p - max_p/2
            pages_numbers.push('...');
            for (let i = total_p - (max_p - 1); i <= total_p; i++) {
                pages_numbers.push(i);
            }
        }
    }
    else {
        for (let i = 1; i <= total_p; i++) {
            pages_numbers.push(i);
        }
    }
    // Turn page numbers into buttons
    const buttons_list = pages_numbers.map((x, i) => {
        if (x === props.this_p) {
            return (_jsx(StyledButton, { selected: true, className: 'number', onClick: () => props.goto_page(x), children: x }, i));
        }
        else if (x !== '...') {
            return (_jsx(StyledButton, { className: 'number', onClick: () => props.goto_page(x), children: x }, i));
        }
        else {
            return (_jsx(StyledButton, { className: 'number', children: x }, i));
        }
    });
    // Deal with Goto page functionality
    const [goto_page, setGotoPage] = useState("");
    const gotoPageSubmit = (e) => {
        e.preventDefault();
        props.goto_page(parseInt(goto_page));
        setGotoPage("");
    };
    return (_jsxs("div", { className: props.className, children: [_jsxs("div", { className: 'pages', children: [props.this_p === 1 ?
                        _jsx(StyledButton, { inactive: true, children: "Previous page" }) :
                        _jsx(StyledButton, { onClick: () => props.goto_page(this_p - 1), children: "Previous page" }), buttons_list, props.this_p === props.total_p ?
                        _jsx(StyledButton, { inactive: true, children: "Next page" }) :
                        _jsx(StyledButton, { onClick: () => props.goto_page(this_p + 1), children: "Next page" })] }), _jsxs("p", { children: ["Pages: ", props.total_p] }), _jsxs("form", { onSubmit: e => gotoPageSubmit(e), children: [_jsxs("label", { children: ["Goto page:", _jsx("input", { type: 'text', value: goto_page, onChange: e => setGotoPage(e.target.value) })] }), _jsx("input", { type: 'submit', value: 'Go' })] })] }));
};
export const StyledPagination = styled(PaginationWidget) `
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
`;
