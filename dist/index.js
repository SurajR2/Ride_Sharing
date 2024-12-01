"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
(0, dotenv_1.configDotenv)();
const connectDB_1 = require("./db/connectDB");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const rides_routes_1 = __importDefault(require("./routes/rides.routes"));
const port = process.env.port || 3000;
(() => {
    (0, connectDB_1.connectDB)();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})();
app.get("/", (req, res) => {
    res.send("The api is working properly ");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/rides", rides_routes_1.default);
