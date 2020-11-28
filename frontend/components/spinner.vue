<template>
  <div v-if="!allLoaded" class="spinner">
    <div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        pageName: '',
    },

    computed:{
        
        pagePostsLoaded(){
            return this.$store.getters.getPagePostsLoaded;
        },

        postsLoaded(){
            return this.$store.getters.getPostsLoaded;
        },

        postTagsLoaded(){
            return this.$store.getters.getPostTagsLoaded;
        },

        popularPostsLoaded(){
            return this.$store.getters.getPopularPostsLoaded;
        },

        allLoaded(){
            if(this.pageName === "Post"){
                if(this.postsLoaded){
                    return true
                }
            }
            if(
                this.popularPostsLoaded &&
                this.postTagsLoaded &&
                this.postsLoaded &&
                this.pagePostsLoaded
            ){
                return true;
            }
            
            return false;
        },

    },

    mounted(){
        this.bodyScroll();
    },

    watch: {
        allLoaded(){
            this.bodyScroll();
        },
    },

    methods :{
        bodyScroll(){
            var body = document.getElementsByTagName('body')[0];
            if(this.allLoaded){
                body.classList.remove('no-overflow');
            }
            else{
                body.classList.add('no-overflow');
            }
        }
    },

}
</script>

<style>

</style>