<template>

    <!-- SIDEBARS -->
    <div class="sidebar">

        <div v-if="similar" class="popular">
            <header>
                <h4 class="popular__headline headline">
                    Similar Posts
                </h4>
            </header>

            <div v-if="similarLoaded" class="popular-posts">

                <article v-for="similar in similarPosts" :key="similar.id" class="popular-post">
                    <nuxt-link :to="{name: 'post-slug-id', params: { slug: similar.slugTitle, id: similar.id } }">
                        <img :src="similar.thumbnail" alt="" class="popular__img">
                    </nuxt-link>
                    <div class="popular-content">
                        <div class="popular-meta">
                            <span class="pubdate">
                                <img src="../assets/imgs/icons/date.svg" alt="">
                                {{similar.date}}
                            </span>
                            <span class="categories">
                                <nuxt-link to="#">
                                    <img src="../assets/imgs/icons/tag.svg" alt="">
                                    {{similar.tags[0].name}}
                                </nuxt-link>
                            </span>
                        </div>
                        <h5 class="popular__title title">
                            <nuxt-link :to="{name: 'post-slug-id', params: { slug: similar.slugTitle, id: similar.id } }">
                                {{similar.title}}
                            </nuxt-link>
                        </h5>
                    </div>
                </article>

                <p v-if="similarPosts.length <= 0" class="no-posts">There are no similar posts, yet :(</p>

            </div>
        </div>

        <div v-if="popular" class="popular">
            <header>
                <h4 class="popular__headline headline">
                    Popular Posts
                </h4>
            </header>

            <div v-if="popularLoaded" class="popular-posts">

                <article v-for="popular in popularPosts" :key="popular.id" class="popular-post">
                    <nuxt-link :to="{name: 'post-slug-id', params: { slug: popular.slugTitle, id: popular.id } }">
                        <img :src="popular.thumbnail" alt="" class="popular__img">
                    </nuxt-link>
                    <div class="popular-content">
                        <div class="popular-meta">
                            <span class="pubdate">
                                <img src="../assets/imgs/icons/date.svg" alt="">
                                {{popular.date}}
                            </span>
                            <span class="categories">
                                <nuxt-link to="#">
                                    <img src="../assets/imgs/icons/tag.svg" alt="">
                                    {{popular.tags[0].name}}
                                </nuxt-link>
                            </span>
                        </div>
                        <h5 class="popular__title title">
                            <nuxt-link :to="{name: 'post-slug-id', params: { slug: popular.slugTitle, id: popular.id } }">
                                {{popular.title}}
                            </nuxt-link>
                        </h5>
                    </div>
                </article>

                <p v-if="popularPosts.length <= 0" class="no-posts">There are no similar posts, yet :(</p>

            </div>
        </div>
        
    </div>
    <!-- END SIDEBARS -->

</template>


<script>
    export default {
        props:{
            similar: false,
            popular: false,
            currentPost: Object,
        },

        data(){
            return{
                popularLoaded: false,
                similarLoaded: false,
                similarPosts: [],
            }
        },

        computed:{
            popularPosts(){
                if(this.popular){
                    return this.$store.getters.getPopularPost;
                }
            },

            rawPosts(){
                if(this.similar){
                    return this.$store.getters.getPosts;
                }
            },
        },

        created(){
            this.loadingManager();
            this.loadSimilarPosts();
        },

        watch:{
            popularPosts(){
                this.loadingManager();
            },

            rawPosts(){
                this.loadSimilarPosts();
            },
        },

        methods:{
            loadingManager(){
                if(this.popular){
                    if(this.popularPosts.length > 0){
                        this.popularLoaded = true;
                    }
                }
            },

            loadSimilarPosts(){
                if(this.similar){

                    var similarPosts = [];
                    if(this.rawPosts.length > 0){
                        for(const post of this.rawPosts){
                            tags:for(const tag of post.tags){
                                if(tag.id == this.currentPost.tags[0].id){
                                    similarPosts.push(post);
                                    break tags;
                                }
                            }
                        }
                    }

                    if(similarPosts.length > 0){
                        similarPosts.reverse();

                        if(similarPosts.length > 5){
                            similarPosts.slice(0, 5)
                        }

                        for(const post of similarPosts){
                            if(this.currentPost.id == post.id){
                                let postIndex = similarPosts.indexOf(post);
                                similarPosts.splice(postIndex, 1)
                                break;
                            }
                        }

                        this.similarPosts = similarPosts;
                        this.similarLoaded = true;
                    }
                }
            },

        },


    }
</script>

