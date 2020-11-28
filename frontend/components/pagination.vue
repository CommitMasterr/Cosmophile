<template>
    <div v-if="pagesLoaded" class="pagination">
        <ul class="pagination-list">
            <li v-bind:class="{ active: currentPage == page }" v-for="page in pages" :key="page" @click="pageData(page)"> 
                {{page}}
            </li>

        </ul>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        
        props:{
            perPage: 0,
            dataName: '',
        },

        data(){
            return{
                pages: [],
                currentPage: 1,
                pagesLoaded: false,
                comments: [],
                toPaginate: [],
            }
        },



        computed: {

            rawPosts(){
                if(this.dataName === "Posts"){
                    return this.$store.getters.getPosts;
                }
            },

            filteredPosts(){
                return this.$store.getters.getFilteredPosts;
            },



        },

        watch: {
            rawPosts(){
                this.loadToPaginate();
            },

            filteredPosts(){
                this.loadToPaginate();
            }
        },

        created(){

            if(this.dataName == "Comments"){
                this.requestComments();

                this.$nuxt.$on('newCommentCreated', (data) => {
                    this.toPaginate.push(data);
                });
            }

        },

        methods:{

            async requestComments(){
                axios.get(process.env.BASE_URL + "comments/" + this.$route.params.id)
                .then((response) => {
                    this.comments = response.data;
                    this.loadToPaginate();
                });
            },

   
            loadToPaginate(){
                if(this.dataName == "Comments"){
                    if(this.comments.length > 0){
                        this.toPaginate = this.comments;
                        this.paginationManager();
                    }
                }
                if(this.dataName === "Posts"){
                    if(this.filteredPosts.length > 0){
                        this.toPaginate = this.filteredPosts;
                        this.paginationManager();
                    }
                    else{
                        if(this.rawPosts.length > 0){
                            this.toPaginate = this.rawPosts;
                            this.paginationManager();
                        }
                    }
                }

            },

            paginationManager(){
                this.pages = [];
                this.currentPage = 1;
                this.paginate();
                this.pageData();   
            },

            paginate(){
                // Adding for from 1 to infinitty order
                let pagesNumber = Math.ceil(this.toPaginate.length / this.perPage) + 1;
                
                for(let i = 1; i < pagesNumber; i++ ){
                    this.pages.push(i);
                }
            },

            pageData(newPage){
                if(newPage){
                    this.currentPage = newPage;
                }

                var dividedPage = [];

                if(this.toPaginate.length <= this.perPage){
                    dividedPage = this.toPaginate;
                }
                else{
                    // Subtracting for from 1 to infinitty order
                    let startScope = this.perPage * (this.currentPage - 1);
                    let endScope = startScope + this.perPage;
                    dividedPage = this.toPaginate.slice(startScope, endScope);
                }

                if(dividedPage.length > 0){
                    if(this.dataName === "Comments"){
                        $nuxt.$emit('pagesDoneLoading', dividedPage)
                    }
                    else{
                        this.$store.dispatch("changePagePosts", dividedPage);
                    }

                    this.pagesLoaded = true;
                }
            },

        },
    }
</script>

<style>

</style>