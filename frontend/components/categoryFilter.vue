<template>
    <div v-if="tagsLoaded" class="feed-filter">
        <div class="feed-filter-category">
            <button @click="changeCategory()">
                All
            </button>
        </div>

        <div v-for="tag in postTags" :key="tag.id" class="feed-filter-category">
            <button @click="changeCategory(tag.id)">
                {{tag.name}}
            </button>
        </div>

    </div>
</template>

<script>
export default {

    data(){
        return{
            tagsLoaded: false,
        }
    },

    computed:{
        postTags(){
            return this.$store.getters.getPostTags;
        },

        rawPosts(){
            return this.$store.getters.getPosts;
        },

        
        filteredPosts(){
            return this.$store.getters.getFilteredPosts;
        },

    },

    created(){
        this.fetchPostTags();
    },

    methods:{

        async fetchPostTags(){
            await this.$store.dispatch("fetchPostTags").then(() => {
                this.tagsLoaded = true;
            });
        },

        changeCategory(newCategory){
            if(newCategory){
                var filteredPosts = [];

                for(const post of this.rawPosts){
                    tags:for(const tag of post.tags){
                        if(tag.id == newCategory){
                            filteredPosts.push(post);
                            break tags;
                        }
                    }
                }

                if(filteredPosts.length > 0){
                    this.$store.dispatch("changeFilteredPosts", filteredPosts);
                }
            }
            else{
                this.$store.dispatch("changeFilteredPosts", this.rawPosts);
            }

        },
    },

}
</script>

<style>

</style>