"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employees_1 = __importDefault(require("./routes/employees"));
const playlist_1 = __importDefault(require("./routes/playlist"));
const products_1 = __importDefault(require("./routes/products"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// routes
app.use("/products", products_1.default);
app.use("/playlists", playlist_1.default);
app.use("/employees", employees_1.default);
app.listen(port, () => {
    console.log(`server listeing on port ${port}...`);
});
//# sourceMappingURL=app.js.map