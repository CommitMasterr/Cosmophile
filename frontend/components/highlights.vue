<template>
    <section class="highlights">
        <div class="container">
            <div class="highlights-inner">
                <header>
                    <h4 class="highlights-headline headline">
                        Highlighted
                    </h4>
                </header>

                <div v-if="popularLoaded && latestLoaded" class="highlights-posts">
                    <article class="highlights-post">
                        <img :src="rawPosts[0].thumbnail" alt="" class="highlights__img">
                        <div class="highlights-content">
                            <span class="highlights__section-mark"><img src="../assets/imgs/icons/play.svg" alt="">Latest Post</span>
                            <h3 class="highlights__title title">
                                <nuxt-link :to="{name: 'post-slug-id', params: { slug: rawPosts[0].slugTitle, id: rawPosts[0].id } }">
                                    {{rawPosts[0].title}}
                                </nuxt-link>
                            </h3>
                            <nuxt-link :to="{name: 'post-slug-id', params: { slug: rawPosts[0].slugTitle, id: rawPosts[0].id } }" class="highlights__btn primary-btn">Keep Reading</nuxt-link>
                        </div>
                    </article>
                    <article class="highlights-post">
                        <img :src="popularPosts[0].thumbnail" alt="" class="highlights__img">
                        <div class="highlights-content">
                            <span class="highlights__section-mark"><img src="../assets/imgs/icons/play.svg" alt="">Popular Post</span>
                            <h3 class="highlights__title title">
                            <nuxt-link :to="{name: 'post-slug-id', params: { slug: popularPosts[0].slugTitle, id: popularPosts[0].id } }">
                                    {{popularPosts[0].title}}
                                </nuxt-link>
                            </h3>
                            <nuxt-link :to="{name: 'post-slug-id', params: { slug: popularPosts[0].slugTitle, id: popularPosts[0].id } }" class="highlights__btn primary-btn">Keep Reading</nuxt-link>
                        </div>
                    </article>
                </div>

            </div>
        </div>
    </section>
</template>


<script>
    export default {

        data(){
            return{
                latestLoaded: false,
                popularLoaded: false,
            }
        },

        computed:{
            rawPosts(){
                return this.$store.getters.getPosts;
            },

            popularPosts(){
                return this.$store.getters.getPopularPost;
            },
        },

        created(){
            this.fetchPopularPost();
            this.manageLatest();
            this.managePopular();
        },

        watch: {
            rawPosts(){
                this.manageLatest();
            },

            popularPosts(){
                this.managePopular();
            },
        },

        methods:{

            async fetchPopularPost(){
                await this.$store.dispatch("fetchPopularPost");
            },

            manageLatest(){
                if(this.rawPosts.length > 0){
                    this.latestLoaded = true
                }

            },

            managePopular(){
                if(this.popularPosts.length > 0){
                    this.popularLoaded = true
                }
            },
            
        },

    }
</script>
