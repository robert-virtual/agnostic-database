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
const playlistsRouter = (0, express_1.Router)();
//C
playlistsRouter.post("/", (_req, res) => {
    res.json({ msg: "created" });
});
//R
playlistsRouter.get("/:id", (req, res) => {
    const id = isNaN(Number(req.params.id))
        ? -1
        : Number(req.params.id);
    res.json({
        msg: `get ${id}`,
        suma: `2 + ${id} = ${2 + id}`,
        type_of_id: typeof id,
    });
});
playlistsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const playlists = yield (0, queries_1.getAll)({
        table: "playlists",
        fields: {
            PlaylistId: true,
            name: true
        }
    });
    res.json({ msg: "get all", playlists });
}));
//U
playlistsRouter.put("/:id", (req, res) => {
    const id = isNaN(Number(req.params.id))
        ? -1
        : Number(req.params.id);
    console.log(`type of id: ${typeof id}`);
    res.json({ msg: "updated " + id });
});
//D
playlistsRouter.delete("/:id", (req, res) => {
    const id = isNaN(Number(req.params.id))
        ? -1
        : Number(req.params.id);
    console.log(`type of id: ${typeof id}`);
    res.json({ msg: "deleted " + id });
});
exports.default = playlistsRouter;
//# sourceMappingURL=playlist.js.map