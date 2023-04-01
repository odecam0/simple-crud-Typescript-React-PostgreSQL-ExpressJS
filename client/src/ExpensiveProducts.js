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
exports.ExpensiveProducts = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var TableStyle_js_1 = require("./TableStyle.js");
var StyledText = styled_components_1["default"].p(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    font-weight: bold;\n    padding-left: 2rem;\n    padding-top: 2rem;\n"], ["\n    font-weight: bold;\n    padding-left: 2rem;\n    padding-top: 2rem;\n"])));
function ExpensiveProducts() {
    var _a = (0, react_1.useState)([]), products = _a[0], setProducts = _a[1];
    (0, react_1.useEffect)(function () {
        fetch('/api/most_expensive')
            .then(function (res) { return res.json(); })
            .then(function (data) { return setProducts(data); })["catch"](function (err) { return console.error(err); });
    }, []);
    var p_list = products.map(function (p, i) {
        return (react_1["default"].createElement("tr", { key: i },
            react_1["default"].createElement("td", null, p.pname),
            react_1["default"].createElement("td", null, p.price),
            react_1["default"].createElement("td", null, p.amount_sold),
            react_1["default"].createElement("td", null, p.pid),
            react_1["default"].createElement("td", null, p.description),
            react_1["default"].createElement("td", null, p.quantity)));
    });
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(StyledText, null, "Here are the 3 most expensive products:"),
        react_1["default"].createElement(TableStyle_js_1.StyledTable, null,
            react_1["default"].createElement("thead", null,
                react_1["default"].createElement("tr", null,
                    react_1["default"].createElement("th", { className: 'th1' }, "Name"),
                    react_1["default"].createElement("th", { className: 'th2' }, "Price"),
                    react_1["default"].createElement("th", { className: 'th3' }, "Amount sold"),
                    react_1["default"].createElement("th", { className: 'th4' }, "ID"),
                    react_1["default"].createElement("th", { className: 'th5' }, "Description"),
                    react_1["default"].createElement("th", { className: 'th6' }, "Quantity"))),
            react_1["default"].createElement("tbody", null, p_list))));
}
exports.ExpensiveProducts = ExpensiveProducts;
var templateObject_1;
