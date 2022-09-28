import express from "express"
import employeesRouter from "./routes/employees"
import playlistsRouter from "./routes/playlist"
import prodsRouter from "./routes/products"
const app = express()
const port = process.env.PORT || 3000

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))


// routes
app.use("/products",prodsRouter)
app.use("/playlists",playlistsRouter)
app.use("/employees",employeesRouter)



app.listen(port,()=>{
  console.log(`server listeing on port ${port}...`);
})






