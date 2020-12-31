<template>
    <v-app class="d-flex justify-center align-center blue lighten-5">
       <!-- <div class="container-class"> -->
           <v-flex class="d-flex justify-center align-center">
                <v-card width="400px" class="light-blue lighten-2 white--text pa-2 pl-8 pr-8">
                <v-card-title class="d-flex flex-column align-center justify-center"><v-icon size="100" color="white">mdi-wechat</v-icon>
                <p class="title-font">Chat It!!!</p></v-card-title>
               
                <v-form class="mt-2" ref="form">
                    <v-text-field label="Enter Display Name" solo :rules="inputRules['nameField']" class="error-class" ></v-text-field>
                    <v-text-field label="Enter Room ID" solo ></v-text-field>
                    <v-main class="d-flex flex-column align-center justify-center">
                    <v-btn depressed  elevation="3" class="green accent-4 white--text mb-4">Join Chat</v-btn>
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
            }
        }
    }
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