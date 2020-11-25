<template>
    <section class="post">
        <div class="container">
            <div class="post-inner">
                <div class="post-row">

                    <!-- POST -->
                    <article v-if="postLoaded" class="post-post">
                        <div class="post-img">
                            <img :src="currentPost.thumbnail" alt="" class="post__img">
                        </div>
                        <div class="post-content">
                            <h3 class="post__title ">
                                {{currentPost.title}}
                            </h3>

                            <div class="post-meta">
                                <span class="pubdate">
                                    <img src="../assets/imgs/icons/date.svg" alt="">
                                    {{currentPost.date}}
                                </span>
                                <span class="categories">
                                    <nuxt-link to="#">
                                        <img src="../assets/imgs/icons/tag.svg" alt="">
                                        {{currentPost.tags[0].name}}
                                    </nuxt-link>
                                </span>
                                <span class="comments">
                                    <img src="../assets/imgs/icons/comments.svg" alt="">
                                    {{rawComments.length}}
                                </span>
                            </div>

                            <p class="post__text">
                                {{currentPost.content}}
                            </p>

                            <div class="post-share">
                                <ul class="social">
                                    <li><nuxt-link to="#"><img src="../assets/imgs/icons/001-twitter.svg" alt=""></nuxt-link></li>
                                    <li><nuxt-link to="#"><img src="../assets/imgs/icons/003-messenger.svg" alt=""></nuxt-link></li>
                                    <li><nuxt-link to="#"><img src="../assets/imgs/icons/007-youtube.svg" alt=""></nuxt-link></li>
                                    <li><nuxt-link to="#"><img src="../assets/imgs/icons/010-linkedin.svg" alt=""></nuxt-link></li>
                                </ul>
                            </div>

                        </div>
                    </article>
                    <!-- END POST -->

                    <!-- ADS -->
                    <div class="ads">
                        <header>
                            <h4 class="headline">Advertisement</h4>
                        </header>
                        <div class="g-list">
                            <div class="banner"></div>
                            <div class="banner"></div>
                            <div class="banner"></div>
                            <div class="banner"></div>
                        </div>
                    </div>
                    <!-- END ADS -->

                    <!-- COMMENTS -->
                    <CommentSection />
                    <!-- END COMMENTS -->


                    <!-- PAGINATION -->
                    <Pagination :perPage=6 dataName="Comments" />
                    <!-- END PAGINATION -->

                </div>

                <Sidebar v-if="postLoaded" :similar=true :currentPost=currentPost />

            </div>
        </div>
    </section>
</template>


<script>
import Sidebar from './sidebar';
import Pagination from './pagination';
import CommentSection from './commentSection';

export default {
    data(){
        return{
            id: this.$route.params.id,
            currentPost: Object,
            postLoaded: false,
        }
    },

    
    computed: {
        rawPosts(){
            return this.$store.getters.getPosts;
        },
        rawComments(){
            return this.$store.getters.getComments;
        }

    },

    created(){
        this.requestPosts();
        this.findPost();
    },

    watch:{
        rawPosts(){
            this.findPost();
        },
    },

    methods:{

        async requestPosts(){
            await this.$store.dispatch("fetchPosts");
        },

        findPost(){

            if(this.rawPosts.length > 0){

                for(const post of this.rawPosts){
                    if(post.id == this.id){
                        this.currentPost = post;
                        this.postLoaded = true;
                        break;
                    }
                }

            }

        },


    },
}
</script>
