<template>
    <v-app class="d-flex justify-center align-center blue lighten-5">
       <!-- <div class="container-class"> -->
           <v-flex class="d-flex justify-center align-center">
                <v-card width="400px" class="light-blue lighten-2 white--text pa-2 pl-8 pr-8">
                <v-card-title class="d-flex flex-column align-center justify-center"><v-icon size="100" color="white">mdi-wechat</v-icon>
                <p class="title-font">Chat It!!!</p></v-card-title>
               
                <v-form class="mt-2" ref="form" @submit.prevent="enterGroup" lazy-validation>
                    <v-text-field v-model="userName" label="Enter Display Name" solo :rules="inputRules['nameField']" class="error-class" ></v-text-field>
                    <v-text-field v-model="roomId" label="Enter Room ID" solo ></v-text-field>
                    <v-main class="d-flex flex-column align-center justify-center">
                    <v-btn depressed  @click="enterGroup" elevation="3" class="green accent-4 white--text mb-4">Join Chat</v-btn>
                    </v-main>
                </v-form>
                </v-card>
                
           </v-flex>
          
        <!-- </div> -->
    </v-app>
</template>
<script>
export default {
    name:'JoinGroup',
    data(){
        return {
            inputRules: {
                nameField : [inputLength => inputLength.length >=4 || 'Minimum length is 3 characters']
            },
            userName: "",
            roomId:"",
            socketId:"",
          
        }
    },
     sockets: {
    connect: function () {
            // console.log('socket connected')
            //listen to sendSocketId
            
        },
    sendSocketId: function(data) {
        // console.log(data) message data containing username and message
        this.socketId= data
      }
  },
    methods : {
        enterGroup(){
            if(this.$refs.form.validate()){
                console.log(this.userName, this.roomId)
                this.$router.push({name:'GroupChat',params: {currentUser: this.userName, roomId: this.roomId}}) // pushing this prop to GroupChat component using router
                // let username=this.username
                // let room = this.roomId
                //join chatroom
                // this.$socket.emit('joinRoom',{username,room})
                this.$socket.emit('connectedUser',{socket_id: this.socketId,user_name:this.userName,roomId:this.roomId})
                
                
            }
        },
    
    },
    
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Redressed&display=swap');
.container-class{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.title-font{
    font-family: 'Redressed';
    font-size:80px;
}
.error-class.error--text,
.error-class .error--text {
    color:rgb(0, 0, 0) !important;
    caret-color: rgb(0, 0, 0) !important;
}
div.v-messages.theme--light.error--text{
    color:rgb(0, 0, 0) !important;
    caret-color: rgb(0, 0, 0) !important;
}
</style>