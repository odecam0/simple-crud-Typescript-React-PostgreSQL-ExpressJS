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
exports.StyledShowProducts = exports.ShowRangeOfProducts = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var PaginationWidget_js_1 = require("./PaginationWidget.js");
var TableStyle_js_1 = require("./TableStyle.js");
var ShowRangeOfProducts = function (props) {
    var rows_per_page = props.rows_per_page ?
        props.rows_per_page : 10;
    var _a = (0, react_1.useState)(0), productsAmount = _a[0], setProductsAmount = _a[1];
    var _b = (0, react_1.useState)([]), products = _b[0], setProducts = _b[1];
    (0, react_1.useEffect)(function () {
        fetch('/api/amount_products')
            .then(function (res) { return res.json(); })
            .then(function (data) { return setProductsAmount(data.length); })["catch"](function (err) { return console.error(err); });
        goto_page(1);
    }, []);
    var n_pages = Math.ceil(productsAmount / rows_per_page);
    var _c = (0, react_1.useState)(1), this_page = _c[0], setThisPage = _c[1];
    var ps = products.map(function (p, i) {
        return (react_1["default"].createElement("tr", { key: i },
            react_1["default"].createElement("td", null, p.pname),
            react_1["default"].createElement("td", null, p.price),
            react_1["default"].createElement("td", null, p.amount_sold),
            react_1["default"].createElement("td", null, p.pid),
            react_1["default"].createElement("td", null, p.description),
            react_1["default"].createElement("td", null, p.quantity)));
    });
    var goto_page = function (x) {
        console.log(x);
        setThisPage(x);
        var first = (x - 1) * rows_per_page;
        var last = first + rows_per_page;
        fetch('/api/products_range', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'first': first, 'last': last })
        })
            .then(function (res) { return res.json(); })
            .then(function (data) { return setProducts(data); });
    };
    return (react_1["default"].createElement("div", { className: props.className },
        react_1["default"].createElement(PaginationWidget_js_1.StyledPagination, { max_p: 9, this_p: this_page, total_p: n_pages, goto_page: goto_page }),
        react_1["default"].createElement("div", { id: 'table-div' },
            react_1["default"].createElement(TableStyle_js_1.StyledTable, null,
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("th", { className: 'th1' }, "Name"),
                        react_1["default"].createElement("th", { className: 'th2' }, "Price"),
                        react_1["default"].createElement("th", { className: 'th3' }, "Amount sold"),
                        react_1["default"].createElement("th", { className: 'th4' }, "ID"),
                        react_1["default"].createElement("th", { className: 'th5' }, "Description"),
                        react_1["default"].createElement("th", { className: 'th6' }, "Quantity"))),
                react_1["default"].createElement("tbody", null, ps)))));
};
exports.ShowRangeOfProducts = ShowRangeOfProducts;
exports.StyledShowProducts = (0, styled_components_1["default"])(exports.ShowRangeOfProducts)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 100%;\n    display: flex;\n    flex-flow: column;\n    padding-top: 3rem;\n\n    #table-div {\n        flex-grow: 2;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: start;\n\theight: 100%;\n    }\n"], ["\n    height: 100%;\n    display: flex;\n    flex-flow: column;\n    padding-top: 3rem;\n\n    #table-div {\n        flex-grow: 2;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: start;\n\theight: 100%;\n    }\n"])));
var templateObject_1;
