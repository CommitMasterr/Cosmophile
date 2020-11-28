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

                    <div v-if="pagePostsLoaded" class="feed-posts">

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
                                        <img src="../assets/imgs/icons/tag.svg" alt="">
                                        {{post.tags[0].name}}
                                    </span>
                                </div>

                                <p v-html="post.content.substring(0, 220)" class="feed__text">
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

    computed:{
        pagePosts(){
            return this.$store.getters.getPagePosts;
        },

        pagePostsLoaded(){
            return this.$store.getters.getPagePostsLoaded;
        }
    },



}
</script>
