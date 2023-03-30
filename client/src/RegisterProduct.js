"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.StyledRegisterForm = exports.RegisterProductForm = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
var StyledForm_js_1 = require("./StyledForm.js");
var RegisterProductForm = function (props) {
    var _a = (0, react_1.useState)({
        "pname": "",
        "price": 0,
        "amount_sold": 0,
        "pid": 0,
        "description": "",
        "quantity": 0
    }), data = _a[0], setData = _a[1];
    var handleChange = function (e) {
        setData(function (data) {
            var _a;
            return __assign(__assign({}, data), (_a = {}, _a[e.target.name] = e.target.value, _a));
        });
    };
    var regProd = function (e) {
        e.preventDefault();
        fetch('/api/register_product', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })["catch"](function (err) { return console.error(err); });
        setData({
            "pname": "",
            "price": 0,
            "amount_sold": 0,
            "pid": 0,
            "description": "",
            "quantity": 0
        });
    };
    return (react_1["default"].createElement("form", { onSubmit: regProd, className: props.className },
        react_1["default"].createElement("label", null,
            "Product's name:",
            react_1["default"].createElement("input", { type: 'text', name: 'pname', value: data.pname, onChange: handleChange })),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", null,
            "Product's price:",
            react_1["default"].createElement("input", { type: 'text', name: 'price', value: data.price, onChange: handleChange })),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", null,
            "Amount of products sold:",
            react_1["default"].createElement("input", { type: 'text', name: 'amount_sold', value: data.amount_sold, onChange: handleChange })),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", null,
            "Product's ID:",
            react_1["default"].createElement("input", { type: 'text', name: 'pid', value: data.pid, onChange: handleChange })),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("label", null,
            "Product's description:",
            react_1["default"].createElement("input", { type: 'text', name: 'description', value: data.description, onChange: handleChange })),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("input", { className: 'submit', type: 'submit', value: 'Submit' })));
};
exports.RegisterProductForm = RegisterProductForm;
exports.StyledRegisterForm = (0, styled_components_1["default"])(exports.RegisterProductForm)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n"], ["\n    ", "\n"])), StyledForm_js_1.baseFormStyle);
var templateObject_1;
