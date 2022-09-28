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
const express_1 = require("express");
const queries_1 = require("../db/queries");
const employeesRouter = (0, express_1.Router)();
//C
employeesRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield (0, queries_1.create)({
        table: "employees",
        data: req.body
    });
    res.json({ employees: employee });
}));
//R
employeesRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = isNaN(Number(req.params.id))
        ? -1
        : Number(req.params.id);
    const employee = yield (0, queries_1.getById)({
        filter: {
            EmployeeId: id,
        },
        table: "employees",
        fields: {
            EmployeeId: true,
            LastName: true,
            FirstName: true,
            Title: true
        }
    });
    res.json({
        employee
    });
}));
employeesRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employees = yield (0, queries_1.getAll)({
        table: "employees",
        fields: {
            EmployeeId: true,
            LastName: true,
            FirstName: true
        }
    });
    res.json({ employees });
}));
//U
employeesRouter.put("/:id", (req, res) => {
    const id = isNaN(Number(req.params.id))
        ? -1
        : Number(req.params.id);
    console.log(`type of id: ${typeof id}`);
    res.json({ msg: "updated " + id });
});
//D
employeesRouter.delete("/:id", (req, res) => {
    const id = isNaN(Number(req.params.id))
        ? -1
        : Number(req.params.id);
    console.log(`type of id: ${typeof id}`);
    res.json({ msg: "deleted " + id });
});
exports.default = employeesRouter;
//# sourceMappingURL=employees.js.map