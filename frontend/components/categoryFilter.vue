<template>
    <div v-if="postTagsLoaded" class="feed-filter">
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
        }
    },

    computed:{
        postTags(){
            return this.$store.getters.getPostTags;
        },

        postTagsLoaded(){
            return this.$store.getters.getPostTagsLoaded;
        },

        rawPosts(){
            return this.$store.getters.getPosts;
        },

    },

    created(){
        this.fetchPostTags();
    },

    methods:{

        async fetchPostTags(){
            this.$store.dispatch("fetchPostTags");
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
                else{
                    alert("There's no posts for this category, yet :)")
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