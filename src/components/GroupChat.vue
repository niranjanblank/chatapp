<template>
    <v-app class="blue lighten-5">
        <navbar :currentUser="currentUser" :roomId="roomId" :participants="roomParticipants"/>
       <v-main v-chat-scroll class="height-style overflow-y-auto" v-scroll.self="onScroll" ref="scrollerMain">
            <v-list class="blue lighten-5"> 
               <v-list-item v-for="(message,index) in messages" :key="index" class=" d-flex" 
               :class="[checkUsername(message.user)?'justify-end':'']"> 
           <messages :message="message"></messages>
               </v-list-item>
           </v-list> 
           <div id="messageLive">
           </div>
        </v-main>

       <v-main>
        <v-form class="ml-4 mr-4 md-2 mt-0" color="white" v-on:submit.prevent="sendData" ref="form" >
                 <v-text-field v-model="messageText"
            outlined
            rounded
            label="Enter text"
            append-icon="mdi-map-marker"
          ></v-text-field>
            </v-form>
        </v-main>
    </v-app>
</template>
<script>
import navbar from './navbar'
import messages from './messages'
export default {
    name:'GroupChat',
    components: {
    navbar, messages },
    props: ['currentUser','roomId'],
  data(){
      return{
          scrollInvoked: 0,
          messages: [
            //   {user:'Niranjan Shah',title:'Hello', content:'World'},
            //   {user:'Rabin Shrestha',title:'Hesd', content:'World'},
            //   {user:'Bedh Shah',title:'Heldo', content:'World'},
            //   {user:'Soduko Shah',title:'Lorem',content:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'}
          ],
          messageText:"",
          currentParticipants:[],
            roomParticipants:[]
      }
  },
  methods: {
      onScroll () {
        this.scrollInvoked++
      },
      checkUsername(username){
            if(this.currentUser=== username)
            {
                return true
            }
            return false
      },
      sendData(){
        if(this.messageText.length>0){
          let data = { user:this.currentUser,content:this.messageText,roomId:this.roomId}
          // this.messages.push(data)
          this.$refs.form.reset()
    
          console.log(data)

          //send message to server
          this.$socket.emit('chatMessage',data)
        }
      }
    },
  sockets: {
    connect: function () {
            // this.$socket.broadcast.emit('connectionMessage',)
        },
        // receive message from server
      message: function(data) {
        // console.log(data) message data containing username and message
        this.messages.push(data)
        console.log(`${data} message data`)
        // console.log(messages)
      },
      updateConnectedUsers: function(data){
        console.log(data)
         this.currentParticipants = data
         this.roomParticipants = this.currentParticipants.filter((element)=>{
           return element.roomId == this.roomId         })
        //  console.log(this.currentParticipants)
      },
      newUser: function(data_newUser){
        //notify other user that new user has joined
        console.log(data_newUser)
      },
      welcomeNewUser: function(data){
        //welcome new user
        console.log(`welcome ${data.user}`)
      }
      //receive message of who connected to socket
      // connectionMessage: function(data){
      //   console.log(`${data} has been connected`)
      // }
  },
  mounted()
    {
      //join a room
        this.$socket.emit('joinRoom',{roomId:this.roomId,user:this.currentUser})
    }
}
</script>
<style scoped>
.height-style{
    height:65vh;
    max-height:65vh
}
</style>