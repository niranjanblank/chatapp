const app = require('express')()
const http = require('http').Server(app)

const io = require('socket.io')(http, {
    cors:{
        origin: "*",
        methods: ["GET","POST"],
        allowedHeaders: ["X-Requested-With","content-type"],
        credentails: false
      }
})

// check connection
io.on('connection', socket=>{
    console.log(`A user connected with socket id ${socket.id}`)
})
http.listen(3000, ()=>{
   console.log("Listening on port 3000")
      
})