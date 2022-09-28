import { Router } from "express";
import {getAll, IPlaylist} from "../db/queries"
const prodsRouter = Router();

//C
prodsRouter.post("/", (_req, res) => {
  res.json({ msg: "created" });
});

//R

prodsRouter.get("/:id", (req, res) => {
  const id = isNaN(Number(req.params.id)) 
    ? -1 
    : Number(req.params.id);
  res.json({
    msg: `get ${id}`,
    suma: `2 + ${id} = ${2 + id}`,
    type_of_id: typeof id,
  });
});


prodsRouter.get("/", async (_req, res) => {
 const playlists:IPlaylist[] = await getAll({
  table:"playlists",
  fields:{
    PlaylistId:true,
    name:true
  }
 })
  res.json({ msg: "get all",playlists });
});
//U
prodsRouter.put("/:id", (req, res) => {
  const id = isNaN(Number(req.params.id)) 
    ? -1 
    : Number(req.params.id);
  console.log(`type of id: ${typeof id}`);
  res.json({ msg: "updated " + id });
});
//D
prodsRouter.delete("/:id", (req, res) => {
  const id = isNaN(Number(req.params.id)) 
    ? -1 
    : Number(req.params.id);
  console.log(`type of id: ${typeof id}`);

  res.json({ msg: "deleted " + id });
});

export default prodsRouter;
