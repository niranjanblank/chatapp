<template>
    
    <v-card class="ma-1 " max-width="400"  >
        <v-card-text> {{message.content}}</v-card-text>
    </v-card>
  
</template>
<script>
export default{
    name:'messages',
    props: ['message'],
    methods: {
        checkUsername(username){
            if(this.currentUser=== username)
            {
                return true
            }
            return false
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