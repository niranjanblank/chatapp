<template>
  <v-app>
   <join-group/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import JoinGroup from './components/JoinGroup'

export default {
  name: 'App',

  components: {
    'join-group':JoinGroup
  },

  data: () => ({
    //
  }),
};
</script>
