"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.StyledPagination = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var StyledButton = styled_components_1["default"].button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        background-color: ", ";\n        border-color: ", ";\n        color:        ", ";\n        border-radius: 10px;\n        font-size: large;\n        font-weight: bold;\n"], ["\n        background-color: ", ";\n        border-color: ", ";\n        color:        ", ";\n        border-radius: 10px;\n        font-size: large;\n        font-weight: bold;\n"])), function (props) { return props.selected ? 'green' : 'white'; }, function (props) { return props.inactive ? 'grey' : 'green'; }, function (props) { return props.inactive ? 'grey' :
    props.selected ? 'white' :
        'green'; });
var PaginationWidget = function (props) {
    // An even max_page prop is problematic ?!
    var max_p = props.max_p % 2 === 0 ? props.max_p + 1 : props.max_p;
    var limit = Math.floor(max_p / 2);
    var total_p = props.total_p;
    var this_p = props.this_p;
    var pages_numbers = [];
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
            for (var i = 1; i <= max_p; i++) {
                pages_numbers.push(i);
            }
            pages_numbers.push('...');
        }
        else if (this_p <= total_p - limit) {
            // (this_p > max_p/2) && this_p (<= total_p - max_p/2)
            pages_numbers.push('...');
            for (var i = this_p - limit; i <= this_p + limit; i++) {
                pages_numbers.push(i);
            }
            pages_numbers.push('...');
        }
        else {
            // this_p > total_p - max_p/2
            pages_numbers.push('...');
            for (var i = total_p - (max_p - 1); i <= total_p; i++) {
                pages_numbers.push(i);
            }
        }
    }
    else {
        for (var i = 1; i <= total_p; i++) {
            pages_numbers.push(i);
        }
    }
    // Turn page numbers into buttons
    var buttons_list = pages_numbers.map(function (x, i) {
        if (x === props.this_p) {
            return (react_1["default"].createElement(StyledButton, { selected: true, className: 'number', key: i, onClick: function () { return props.goto_page(x); } }, x));
        }
        else if (x !== '...') {
            return (react_1["default"].createElement(StyledButton, { className: 'number', onClick: function () { return props.goto_page(x); }, key: i }, x));
        }
        else {
            return (react_1["default"].createElement(StyledButton, { className: 'number', key: i }, x));
        }
    });
    // Deal with Goto page functionality
    var _a = (0, react_1.useState)(""), goto_page = _a[0], setGotoPage = _a[1];
    var gotoPageSubmit = function (e) {
        e.preventDefault();
        props.goto_page(parseInt(goto_page));
        setGotoPage("");
    };
    return (react_1["default"].createElement("div", { className: props.className },
        react_1["default"].createElement("div", { className: 'pages' },
            props.this_p === 1 ?
                react_1["default"].createElement(StyledButton, { inactive: true }, "Previous page") :
                react_1["default"].createElement(StyledButton, { onClick: function () { return props.goto_page(this_p - 1); } }, "Previous page"),
            buttons_list,
            props.this_p === props.total_p ?
                react_1["default"].createElement(StyledButton, { inactive: true }, "Next page") :
                react_1["default"].createElement(StyledButton, { onClick: function () { return props.goto_page(this_p + 1); } }, "Next page")),
        react_1["default"].createElement("p", null,
            "Pages: ",
            props.total_p),
        react_1["default"].createElement("form", { onSubmit: function (e) { return gotoPageSubmit(e); } },
            react_1["default"].createElement("label", null,
                "Goto page:",
                react_1["default"].createElement("input", { type: 'text', value: goto_page, onChange: function (e) { return setGotoPage(e.target.value); } })),
            react_1["default"].createElement("input", { type: 'submit', value: 'Go' }))));
};
exports.StyledPagination = (0, styled_components_1["default"])(PaginationWidget)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n    padding-left: 3rem;\n    padding-right: 3rem;\n    gap: 0.2rem;\n    color: green;\n    font-weight: bold;\n    font-size: medium;\n\n    input {\n        width: 50px;\n        border-color: green;\n        border-radius: 10px;\n        background-color: white;\n        text-align: center;\n        color: green;\n        font-weight: bold;\n    }\n\n    form {\n        display: flex;\n        gap: 0.2rem;\n    }\n\n    button.number {\n        width: 2rem;\n    }\n\n    .pages {\n        display: flex;\n        justify-content: center;\n        gap: 0.25rem;\n    }\n"], ["\n    display: flex;\n    align-items: center;\n    justify-content: space-evenly;\n    padding-left: 3rem;\n    padding-right: 3rem;\n    gap: 0.2rem;\n    color: green;\n    font-weight: bold;\n    font-size: medium;\n\n    input {\n        width: 50px;\n        border-color: green;\n        border-radius: 10px;\n        background-color: white;\n        text-align: center;\n        color: green;\n        font-weight: bold;\n    }\n\n    form {\n        display: flex;\n        gap: 0.2rem;\n    }\n\n    button.number {\n        width: 2rem;\n    }\n\n    .pages {\n        display: flex;\n        justify-content: center;\n        gap: 0.25rem;\n    }\n"])));
var templateObject_1, templateObject_2;
