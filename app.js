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

var connected_user=[]

// check connection
io.on('connection', socket=>{
    console.log(`A user connected with socket id ${socket.id}`)

    //sending socketId
    socket.emit('sendSocketId',socket.id)

    //receive newConnected Information and add to connected_user
    socket.on('connectedUser',(data)=>{
        connected_user.push(data)
        // updated the connected_user list
         io.emit('updateConnectedUsers',connected_user)
    })

    

    //listen for the chatMessages
    socket.on('chatMessage',(msgData)=>{
        //send the message data to everyone conneced to server i.e. all clients
        io.emit('message',msgData)
    })

    //listen for connected users


    //socket on disconnecting
    socket.on('disconnect',()=>{
       let filtered_list = connected_user.filter((element)=>{
            return element.socket_id != socket.id
        })
        connected_user = filtered_list
        io.emit('updateConnectedUsers',filtered_list)
        
    })
})
http.listen(3000, ()=>{
   console.log("Listening on port 3000")
      
})