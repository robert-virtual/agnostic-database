"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlaylists = exports.getAll = exports.getById = exports.create = void 0;
const sqlite3_1 = require("sqlite3");
let sqlitedb;
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        if (sqlitedb) {
            return sqlitedb;
        }
        sqlitedb = yield new Promise((res, rej) => {
            const db = new sqlite3_1.Database("./chinook.db", (err) => {
                if (err) {
                    rej(err.message);
                    console.log(`error: ${err.message} `);
                    return;
                }
                res(db);
                console.log('successful conneccion to sqlite chinook db ');
            });
        });
        return sqlitedb;
    });
}
function create({ table, data }) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDB();
        const keys = Object.keys(data);
        const values = Object.values(data);
        const sql = `INSERT INTO ${table}(${keys.join(",")}) VALUES ${values.map(() => "?").join()} `;
        return yield new Promise((res, rej) => {
            db.run(sql, values, (err) => {
                if (err) {
                    rej(err.message);
                    return;
                }
                res(data);
            });
        });
    });
}
exports.create = create;
function getById({ table, filter, fields }) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDB();
        const keys = Object.keys(fields !== null && fields !== void 0 ? fields : filter);
        const sql = `SELECT ${keys.join(",")} from ${table} where ${Object.keys(filter).join("=? or") + "=?"}`;
        return yield new Promise((res, rej) => {
            db.get(sql, Object.values(filter), (err, row) => {
                if (err) {
                    rej(err.message);
                    return;
                }
                res(row);
            });
        });
    });
}
exports.getById = getById;
function getAll({ table, fields }) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDB();
        const keys = Object.keys(fields);
        const sql = `SELECT DISTINCT ${keys.join(",")} from ${table}`;
        return yield new Promise((res, rej) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                    return;
                }
                res(rows);
            });
        });
    });
}
exports.getAll = getAll;
function getAllPlaylists() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connectToDB();
        const sql = "SELECT DISTINCT PlaylistId,name from playlists order by name";
        return yield new Promise((res, rej) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    rej(err.message);
                    return;
                }
                res(rows);
            });
        });
    });
}
exports.getAllPlaylists = getAllPlaylists;
//# sourceMappingURL=queries.js.map