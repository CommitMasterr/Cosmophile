<template>
    <div class="fragment">

    <div class="mobile">
        <div class="mobile-btn" @click="openMobileMenu()">
        </div>
    </div>

    <div class="mobile-menu">
        <ul class="mobile-list">
            <li>
                <a href="mailto:commitmaster@gmail.com">Contact</a>
            </li>
        </ul>
        
        <ul class="mobile-social social">
            <li><nuxt-link to="#"><img src="../assets/imgs/icons/001-twitter.svg" alt=""></nuxt-link></li>
            <li><nuxt-link to="#"><img src="../assets/imgs/icons/003-messenger.svg" alt=""></nuxt-link></li>
            <li><nuxt-link to="#"><img src="../assets/imgs/icons/007-youtube.svg" alt=""></nuxt-link></li>
            <li><nuxt-link to="#"><img src="../assets/imgs/icons/010-linkedin.svg" alt=""></nuxt-link></li>
        </ul>
    </div>

    <div class="mobile-shadow">
    </div>

    </div>

</template>

<style scoped>
    .fragment{
        position: absolute;
    }
</style>


<script>

export default {
    data(){
        return{
            menuOpen: false,
        }
    },

    methods:{

        openMobileMenu(){
            var menu = document.getElementsByClassName("mobile-menu");
            var burger = document.getElementsByClassName("mobile-btn");
            var shadow = document.getElementsByClassName("mobile-shadow");
            
            if(!this.menuOpen){
                menu[0].classList.add("open");
                shadow[0].classList.add("on");
                burger[0].classList.add("active");
                this.menuOpen = true;
            }
            else{
                menu[0].classList.remove("open");
                shadow[0].classList.remove("on");
                burger[0].classList.remove("active");
                this.menuOpen = false;
            }
        }

    },
}

</script>