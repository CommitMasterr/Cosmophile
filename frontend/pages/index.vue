<template>
  <main class="main">
    <Spinner/>
    <Highlights />
    <Feed />
  </main>
</template>


<script>
import Spinner from '@/components/spinner';
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
