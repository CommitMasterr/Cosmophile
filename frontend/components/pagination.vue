<template>
    <div v-if="valid" class="pagination">
        <ul class="pagination-list">
            <li v-bind:class="{ active: currentPage == page }" v-for="page in pages" :key="page" @click="pageData(page)"> 
                {{page}}
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        
        props:{
            perPage: 0,
            dataName: '',
        },

        data(){
            return{
                pages: [],
                currentPage: 1,

            }
        },



        computed: {
            rawData(){
                return this.$store.getters['get' + this.dataName];
            },

            filteredPosts(){
                return this.$store.getters.getFilteredPosts;
            },

            toPaginate(){
                if(this.filteredPosts.length > 0){
                    return this.filteredPosts;
                }
                else{
                    return this.rawData;
                }

            },

            valid(){
                if(this.rawData.length > 0){
                    return true
                }
                else{
                    return false
                }
            }
        },

        watch: {
            toPaginate(){
                if(this.toPaginate.length > 0){
                    this.pages = [];
                    this.currentPage = 1;
                    this.paginate();
                    this.pageData();
                }
            },
        },

        created(){
            this.requestData();
        },

        methods:{

            async requestData(){
                if(this.dataName == "Comments")
                {
                    await this.$store.dispatch("fetch" + this.dataName, this.$route.params.id);
                }
                else{
                    await this.$store.dispatch("fetch" + this.dataName); 
                }

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
                    this.$store.dispatch("changePage"+ this.dataName, dividedPage);
                }
            },

        },
    }
</script>

<style>

</style>