<template>
    
    <v-card max-width="400"
        class="mb-2">
        <v-card-title class="ma-0 pb-0">
            <span  class="caption green--text">{{message.user}} | {{message.time}} </span>
        </v-card-title>
            <v-card-text> {{message.content}}</v-card-text>
        </v-card>
  
</template>
<script>
export default{
    name:'messages',
    props: ['message','currentUser'],
    methods: {
        checkUsername(username){
            if(this.currentUser=== username)
            {
                return true
            }
            return false
      },
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
    },
    

}
</script>
<style scoped>
.message-display{
    display: flex;
    justify-content: end;
    align-items: end;
}
</style>