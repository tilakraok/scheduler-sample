"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
let app = (0, express_1.default)();
const requestLogger = function (req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};
app.use(requestLogger);
app.get('/', (req, res) => {
    res.send('Welcome');
});
app.listen(3000, () => {
    console.log("App started on port 3000");
});
