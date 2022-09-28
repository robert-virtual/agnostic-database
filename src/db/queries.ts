import { Database } from "sqlite3";

let sqlitedb:Database
 async function connectToDB():Promise<Database> {
  if (sqlitedb) {
   return sqlitedb
  }
   sqlitedb = await new Promise((res,rej)=>{
const db = new Database("./chinook.db",(err)=>{
     if (err) {
       rej(err.message)
       console.log(`error: ${err.message} `);
       return
     }
      res(db)
     console.log('successful conneccion to sqlite chinook db ');
  })
     })
  return sqlitedb
  
}

export interface IPlaylist{
  PlaylistId:number,
  name:string
}
interface CreateParams {
  table:string
  data:{}
}
export async function create<T>({table,data}:CreateParams):Promise<Partial<T>> {
  const db = await connectToDB()
  const keys =  Object.keys(data)
  const values = Object.values(data)
  const sql = `INSERT INTO ${table}(${keys.join(",")}) VALUES ${values.map(()=>"?").join()} `
  return await new Promise<T>((res,rej)=>{
    db.run(sql,values,(err)=>{
      if (err) {
       rej(err.message) 
       return
      }
      res(data as T)
    })
  })
}
interface GetByIdParams extends GetAllParams{
  filter:{},
}
export async function getById<T>({table,filter,fields}:GetByIdParams):Promise<T> {
  const db = await connectToDB()
  const keys =  Object.keys(fields ?? filter)
  const sql = `SELECT ${keys.join(",")} from ${table} where ${Object.keys(filter).join("=? or")+"=?"}`
  return await new Promise<T>((res,rej)=>{
    db.get(sql,Object.values(filter),(err,row)=>{
      if (err) {
       rej(err.message) 
       return
      }
      res(row)
    })
  })
}
interface GetAllParams{
  table:string,
  fields:any
}
export async function getAll<T>({table,fields}:GetAllParams):Promise<T[]> {
  const db = await connectToDB()
  const keys =  Object.keys(fields)
  const sql = `SELECT DISTINCT ${keys.join(",")} from ${table}`
  return await new Promise<T[]>((res,rej)=>{
    db.all(sql,(err,rows)=>{
      if (err) {
       rej(err.message) 
       return
      }
      res(rows)
    })
  })
}
export async function getAllPlaylists():Promise<IPlaylist[]> {
  const db = await connectToDB()
  const sql = "SELECT DISTINCT PlaylistId,name from playlists order by name"
  return await new Promise<IPlaylist[]>((res,rej)=>{
    db.all(sql,(err,rows)=>{
      if (err) {
       rej(err.message) 
       return
      }
      res(rows)
    })
  })
}

