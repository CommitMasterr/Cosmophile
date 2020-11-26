<template>
  <main class="main">
    <Highlights />
    <Feed />
  </main>
</template>


<script>
import Highlights from '@/components/highlights';
import Feed from '@/components/feed';

export default {
  created(){
    this.$store.dispatch("fetchPosts"); 
  },
}
</script>

<style>
  
</style>
