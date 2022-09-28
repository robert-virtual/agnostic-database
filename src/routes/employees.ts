
import { Router } from "express";
import {create, getAll, getById} from "../db/queries"
const employeesRouter = Router();

//C
employeesRouter.post("/",async (req, res) => {
 const employee = await create({
  table:"employees",
  data:req.body
 })
  res.json({ employees: employee });
});

//R

employeesRouter.get("/:id",async (req, res) => {
  const id = isNaN(Number(req.params.id)) 
    ? -1 
    : Number(req.params.id);
 const employee = await getById({
   filter:{
    EmployeeId:id,
   },
  table:"employees",
  fields:{
    EmployeeId:true,
    LastName:true,
    FirstName:true,
    Title:true
  }
 })
  res.json({
    employee
  });
});


employeesRouter.get("/", async (_req, res) => {
 const employees = await getAll({
  table:"employees",
  fields:{
    EmployeeId:true,
    LastName:true,
    FirstName:true
  }
 })
  res.json({ employees });
});
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

export default employeesRouter;
