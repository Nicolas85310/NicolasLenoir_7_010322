<template>  
    <div id="post">
        <nav class="navbar navbar-expand-lg navbar-light nav">
            <img class="nav__logo" src="../assets/hometitle.png" alt="Logo de Groupomania">

            <button class="navbar-toggler justify-content-center nav__menuButton" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>

            <button @click="refresh" type="button" class="createAnewArticle" aria-label="Créer votre article">Créer votre article... <i class="fa-regular fa-pen-to-square fa-2x"></i></button>

            <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul class="navbar-nav nav__links">
                    <li class="nav-item">
                        
                        <router-link to="/post" class="nav__links__link"><i class="fa-solid fa-house-user fa-xs"></i> Accueil</router-link> 
                    </li>

                    <li class="nav-item">
                        <router-link to="/profile" class="nav__links__link"><i class="fa-solid fa-user-pen fa-xs"></i> Mon profil</router-link>
                    </li>

                    <li class="nav-item">
                        <ModaleLogout v-bind:revele="revele" v-bind:displayModale='displayModale'/>
                        <button @click="displayModale" class="nav__links__logoutLink">Déconnexion <i class="fas fa-sign-out-alt"></i></button>    
                    </li>
                </ul>
            </div>
        </nav>

        <router-view/>
    </div>
</template>

<script>
    import ModaleLogout from '@/components/SignOut.vue'

    export default {
        name: 'Navbar_Bloc',
        data(){
            return {
                revele: false
            }
        },
        components: {
            ModaleLogout
        },
        methods: {
            //Affiche la pop-up de déconnexion 
            displayModale() {
                this.revele = !this.revele
            },
            //re-dirger vers le haut de page
           refresh() {
              
               window.location.href="#post"
            }
        }
    }
    
</script>

<style scoped lang="scss">

    .nav {
        
        background: #c2442a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        box-shadow: 5px 20px 15px #090909;
        position: fixed;
        animation: stickAnim .9s;
        @keyframes stickAnim {
	0% {
		transform: translateY(-86px);
	}
	100% {
		transform: translateY(0);
	}
}


        &__logo {
            display: flex;
            justify-content: flex-start;
            max-width: 450px;
            width: 52%;
        }
        &__menuButton:hover, &__menuButton:focus {
            color: #3f3d56;
        }
        a{
            font-weight: bold;
            color: white;
           
            &:hover, &:focus  {
                color: #0a0a0a;
            }
        }
        &__links {
            padding: 2rem;
            align-items: flex-end;
            @media (max-width: 776px) {
                padding: 0;
            }
            &__link {   
                padding-right: 4rem;
                text-decoration: none;
                align-items: flex-end;
                @media (max-width: 990px) {
                    padding: 0;
                }
            }
            &__logoutLink {
                border: none;
                background-color: white;
                &:hover, &:focus  {
                    color: #f33009;
                }
                @media (max-width: 990px) {
                    padding-right: 0;
                }
            }
        }
    }
</style>