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
    
    
    //join room
    socket.on('joinRoom',(data)=>{
        socket.join(data.roomId)
        
        //broadcast to all other users that a new user have joined
        socket.broadcast.to(data.roomId).emit('newUser',data.user)

        //welcome new user
        socket.emit('welcomeNewUser',data)
    })
    //receive newConnected Information and add to connected_user
    socket.on('connectedUser',(data)=>{
        connected_user.push(data)
        // updated the connected_user list
         io.emit('updateConnectedUsers',connected_user)
    })

    

    //listen for the chatMessages
    socket.on('chatMessage',(msgData)=>{
        //send the message data to everyone conneced to server i.e. all clients
        io.to(msgData.roomId).emit('message',msgData)
        // console.log(msgData)
    })

    //listen for connected users


    //socket on disconnecting
    socket.on('disconnect',()=>{

        let user_info = connected_user.filter((element)=>{
            return element.socket_id == socket.id
        })[0]
        
        //notication when someone has left the room
        try{
        io.to(user_info.roomId).emit('userleft',user_info.user_name)
         }
         catch(err){

         }
         finally{
       let filtered_list = connected_user.filter((element)=>{
            return element.socket_id != socket.id
        })
        connected_user = filtered_list
        io.emit('updateConnectedUsers',filtered_list)
    }
    })
})
http.listen(3000,'192.168.0.12', ()=>{
   console.log("Listening on port 3000")
      
})