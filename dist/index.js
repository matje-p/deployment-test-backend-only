"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
// import { MongoClient } from 'mongodb';
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    // console.log("hello world");
    res.send("Hello World");
});
app.listen(port, () => {
    // console.log(`Server is running on port ${port}`);
});
