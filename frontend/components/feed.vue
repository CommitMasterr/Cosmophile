<template>
    <section class="feed">
        <div class="container">
            <div class="feed-inner">
                <div class="feed-feed">
                    <header>
                        <h4 class="headline">
                            Categories
                        </h4>
                    </header>
          
                    <CategoryFilter />

                    <div v-if="loaded" class="feed-posts">

                        <article v-for="post in pagePosts" :key="post.id" class="feed-post">
                            <div class="feed-img">
                                <nuxt-link :to="{name: 'post-slug-id', params: { slug: post.slugTitle, id: post.id } }">
                                    <img :src="post.thumbnail" alt="" class="feed__img">
                                </nuxt-link>
                            </div>
                            <div class="feed-content">
                                <h3 class="feed__title title">
                                    <nuxt-link :to="{name: 'post-slug-id', params: { slug: post.slugTitle,  id: post.id } }">
                                        {{post.title}}
                                    </nuxt-link>
                                </h3>
                                <div class="feed-meta">
                                    <span class="pubdate">
                                        <img src="../assets/imgs/icons/date.svg" alt="">
                                        {{post.date}}
                                    </span>
                                    <span class="categories">
                                        <nuxt-link to="#">
                                            <img src="../assets/imgs/icons/tag.svg" alt="">
                                            {{post.tags[0].name}}
                                        </nuxt-link>
                                    </span>
                                </div>

                                <p class="feed__text">
                                    {{post.content.substring(0, 200) + "..."}}
                                </p>
        
                            </div>
                        </article>
                    </div>

                    <Pagination :perPage=4 dataName="Posts" />

                </div>

                <Sidebar :popular=true />
   
            </div>
        </div>
    </section>
</template>


<script>
import Sidebar from './sidebar';
import Pagination from './pagination';
import CategoryFilter from './categoryFilter';

export default {

    data(){
        return{
            loaded: false,
        }
    },

    computed:{
        pagePosts(){
            return this.$store.getters.getPagePosts;
        },
    },

    watch:{
        pagePosts(){
            this.managePage();
        },
    },

    methods: {
        managePage(){
            if(this.pagePosts.length > 0){
                this.loaded = true;
            }
        },
    },
}
</script>
