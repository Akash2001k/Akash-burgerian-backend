import app from './app.js'
import { connectDb } from './config/database.js'

connectDb()

app.get('/',(req,res)=>{
   res.send("<h1 style='color:red'>Hello from Akash Burgerian<h1>")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is Working at Port no. ${process.env.PORT}`)
})