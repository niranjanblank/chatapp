<template>
    <v-app class="blue lighten-5">
      <!-- Snackbar -->
         <v-snackbar
      v-model="snackbar"
      top
    >
      {{snackbarText}}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

      <!--  -->
        <navbar :currentUser="currentUser" :roomId="roomId" :participants="roomParticipants"/>
       <v-main v-chat-scroll class="height-style overflow-y-auto" v-scroll.self="onScroll" ref="scrollerMain">
            <v-list class="blue lighten-5"> 
               <v-list-item v-for="(message,index) in messages" :key="index" class=" d-flex" 
               :class="[checkUsername(message.user)?'justify-end':'']"> 
           <messages :message="message" :currentUser="currentUser"></messages>
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
            append-icon="mdi-send" @click:append="sendData"
          ></v-text-field>
            </v-form>
        </v-main>
    </v-app>
</template>
<script>
import navbar from './navbar'
import messages from './messages'
import moment from 'moment'
export default {
    name:'GroupChat',
    components: {
    navbar, messages },
    props: ['currentUser','roomId'],
  data(){
      return{
          scrollInvoked: 0,
          messages: [
            // to store the messages received or sent
            ],
          messageText:"",
          currentParticipants:[],
            roomParticipants:[],
            snackbar: false,
            snackbarText:""
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
          let data = { user:this.currentUser,content:this.messageText,roomId:this.roomId,time:moment().format('LT')}
          // this.messages.push(data)
          this.$refs.form.reset()
    
          // console.log(data)
          // console.log(`Time: ${moment().format('LT')}`)
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
        // console.log(`${data} message data`)
        // console.log(messages)
      },
      updateConnectedUsers: function(data){
        // console.log(data)
         this.currentParticipants = data
         this.roomParticipants = this.currentParticipants.filter((element)=>{
           return element.roomId == this.roomId         })
        //  console.log(this.currentParticipants)
      },
      newUser: function(data_newUser){
        //notify other user that new user has joined
        // console.log(data_newUser)
        this.snackbar= true
        this.snackbarText=`${data_newUser} has joined `
      },
      welcomeNewUser: function(data){
        //welcome new user
        
        // console.log(`welcome ${data.user}`)
        this.snackbar= true
        this.snackbarText=`Welcome ${data.user} `
      },
      userleft : function(data){
        //notifies all other user when someone has left
          this.snackbar= true
        this.snackbarText=` ${data} has left `
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