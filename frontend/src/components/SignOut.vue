<template> 
    <div v-if="revele" class="modaleBloc">
        <div @click="displayModale" class="modaleBloc__overlay"></div>
        
        <div class="modaleBloc__card">
            <div class="modaleBloc__card__title">
                <h2>Se déconnecter ?</h2>
                
                <div class="modaleBloc__card__title__close">
                    <i @click="displayModale" class="far fa-times-circle fa-2x modaleBloc__card__title__close" aria-label="Fermer la fenêtre"></i>
                </div>
            </div>

            <button @click="logout" class="modaleBloc__card__button" aria-label="Se déconnecter">Déconnexion <i class="fas fa-sign-out-alt"></i></button>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'ModaleLogout',
        props: ['revele', 'displayModale'],
        methods: {
            logout() {
                // Permet de se déconnecter
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('isAdmin');
                localStorage.removeItem('imageProfile');
                
                this.$router.push('http://localhost:8080/');
            }
        }
    }
</script>


<style scoped lang="scss">
    .modaleBloc {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &__overlay {
            background: rgba(0,0,0,0.5);
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
        &__card {
            z-index: 4;
            position: fixed;
            border-radius: 35px;
            background: #eb4509;
            color: #f8f8fb;
            &__title {
                display: flex;
                flex-direction: column;
                text-align: center;
                padding: 3rem 6rem 1.5rem 6rem;
                & h2 {
                    margin-top: 0px;
                    @media (max-width: 500px) {
                        font-size: 20px;
                    }
                }
                &__close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    color: #3f3d56;
                    &:hover, &:focus {
                        color: #b31010;
                    }
                }
            }
            &__button {
                border: 3px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.9rem;
                margin: 1rem 0 2rem 0;
                outline-style: none;
                &:hover, &:focus {
                    border: 3px solid #b31010;
                    color: #b31010;
                }
            }
        }       
    }
</style>