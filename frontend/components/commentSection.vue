<template>
<div class="comments">
<header>
    <h4 class="headline">Comments</h4>
</header>

    <form @submit.prevent="validate" method="post" class="comments-form">
        <div class="form-group">
            <input v-model="email" type="email" placeholder="Email">
            <input v-model="name" type="text" placeholder="Name">
        </div>

        <div class="form-group">
            <textarea v-model="content"  class="form__textarea" name="" placeholder="Comment"></textarea>
        </div>

        <div class="form-group">
            <button class="form__submit primary-btn" type="submit">Submit</button>

            <vue-recaptcha
                ref="recaptcha"
                :sitekey="siteKey"
                :loadRecaptchaScript="true"
                @verify="markRecaptchaVerified"
                @expired="markRecaptchaExpired"
            />

        </div>
    </form>

    <div v-if="commentsLoaded" class="comments-list">

        <div  v-for="comment in pageComments" :key="comment.id" class="comments-comment">
            <img src="../assets/imgs/ava.jpg" alt="" class="comments__avatar">
            <div class="comments-content">
                <div class="comments-header">
                    <h4 class="comments__name">
                        {{comment.name}}
                    </h4>
                    <span class="pubdate">
                        {{comment.date}}
                    </span>
                </div>
                <p class="comments__text">
                    {{comment.content}}
                </p>
            </div>
        </div>

    </div>
</div>
</template>

<script>
    import VueRecaptcha from 'vue-recaptcha';
    import axios from 'axios'

    export default {
        
        components: { VueRecaptcha },

        data(){
            return{
                id: this.$route.params.id,
                commentsLoaded: false,

                siteKey: "6LfRl-kZAAAAAJaOG44B1LV4eBsoT6GFown3oaVm",
                
                recaptchaToken: '',
                email: '', 
                name: '',
                content: '',      
                
                pageComments: [],
            }
        },

        created(){
            this.$nuxt.$on('pagesDoneLoading', (data) => {
                this.pageComments = data;
                this.commentsLoaded = true;
            })
        },


        methods:{

            markRecaptchaVerified(response) {
                this.recaptchaToken = response;
            },
            
            markRecaptchaExpired(response) {
                this.recaptchaToken = '';
            },

            validate() {
                if (this.recaptchaToken === "" || this.recaptchaToken === undefined){
                    alert("Please, select Google captcha before submiting the comment!")
                    return true; 
                }
                if(
                    this.email === "" ||
                    this.name === "" ||
                    this.content === ""
                ){
                    alert("Please, fill all inputs before submiting the comment!")
                    return true; 
                }
                
                this.createComment();
            },

            createComment(){
                axios.post("http://127.0.0.1:8000/api/comment/create", {
                    email: this.email,
                    name: this.name,
                    content: this.content,
                    post: this.id,
                    recaptchaToken: this.recaptchaToken
                })
                .then((response) => {
                    console.log(response);
                    this.email = "";
                    this.name = "";
                    this.content = "";
                    this.$refs.recaptcha.reset();
                    $nuxt.$emit('newCommentCreated', response.data)
                })
                .catch((reject) => {
                    console.warn(reject);
                });
            },

        }
    }
</script>

