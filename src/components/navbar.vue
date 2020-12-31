<template>
    <nav :class="color" class="white--text">
         
    <v-app-bar flat app :class="color">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
       

    </v-app-bar>
    <v-form>
        <v-text-field width="400"
            outlined
            label="Append"
            append-icon="mdi-map-marker"
          >hello </v-text-field>
    </v-form>
        <v-navigation-drawer
        app
        v-model="drawer" class="light-blue lighten-2">

        <v-layout column align-center>
               <v-flex class="mt-5 d-flex justify-center align-center" >
                       <v-avatar color="teal" size="80" >
                <span class="white--text headline">{{getShortName(name)}}</span>
                     </v-avatar>
                 
                </v-flex>
                 
                   <p class="white--text subheading mt-1 h3">{{name}}</p>
           </v-layout>
        <v-divider></v-divider>
        <v-flex class="mt-5 mb-5"><v-icon color="white" class="ml-4 mr-2">mdi-google-classroom</v-icon> {{roomName}}</v-flex>
        <v-divider></v-divider>
        <v-flex class="mt-2 h1"><v-icon color="white" class="ml-4 mr-2">mdi-account-multiple</v-icon> Participants</v-flex>
            <v-list>
                <v-list-item v-for="(participant,index) in participants" :key="index">
                    <v-avatar color="red mr-3 ml-4" size="35" >
                    <span class="white--text headline" ><h5 class="">{{getShortName(participant)}}</h5></span>
                     </v-avatar>
                    <v-list-item-title class="white--text"> {{participant}}</v-list-item-title>
                </v-list-item>
            </v-list>
    </v-navigation-drawer>
  
</nav>
</template>
<style scoped>

</style>
<script>
export default {
    name:'navbar',
    data(){
        return {
            drawer: false,
            group: null,
            color: 'blue lighten-5',
            roomName: 'Some Room',
            name: 'Niranjan Shah',
            participants: ['Niranjan Shah','Rabin Shrestha', 'Selena Gomez']
            
        }
    },
    methods:{
        getShortName(name){
            let splitname=name.split(" ")
            let shortName=""
            splitname.forEach((element,index)=>{
                 if(index>1){
                    return shortName.toUpperCase()
                }
                shortName+= element[0]
            })
            return shortName.toUpperCase()
        }

}
}
</script>