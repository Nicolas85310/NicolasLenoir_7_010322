
<template>
    <div class="home">
        <img class="home__title" src="../assets/hometitle.png" alt="Logo Groupomania">

        <div class="home__display">
            
            <form @submit.prevent="login" class="home__display__form">
                <h1 class="home__display__form__title">Connexion</h1>

                <div class="home__display__form__input">
                    <label for="mail" class="home__display__form__input__label">Votre @ mail:</label>
                    <input type="email" v-model="email" id="mail" name="mail">
                </div>

                <div class="home__display__form__input">
                    <label for="password" class="home__display__form__input__label">Mot de passe</label>
                    <input type="password" v-model="password" id="password" name="password">
                </div>

                <button class="home__display__form__button">Se connecter</button>

                <p>Pas encore inscrit(e) ? <router-link to="/signup" class="home__display__form__signup">Cliquez pour vous
                        inscrire</router-link>
                </p>
            </form>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

export default {
    name: 'Home_bloc',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    created() {
        this.notyf = new Notyf({
            duration: 3000,
            position: {
                x: 'center',
                y: 'top'
            }
        });
    },
    methods: {
        
        login() {//Garder l'utilisateur connecté même après refresh
            axios.post('http://localhost:3000/api/user/login', {
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('adminStatus', response.data.adminStatus);
                    localStorage.setItem('avatar', response.data.avatar);

                    this.$router.push('post');
                })
                .catch(error => {
                    
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                    
                })
        }
    }
}
</script>


<style scoped lang="scss">
.home {
    &__title {
        @media (max-width: 930px) {
            max-width: 400px;
            width: 90%;
        }
    }

    &__display {
        margin-top: 6rem;
        display: flex;
        justify-content: space-around;
        background-image: url(../assets/image_de_fond.jpg);
        width: 100%;
        height: auto;
        background-size: cover;
        background-repeat: no-repeat;

        @media (max-width: 930px) {
            display: flex;
            flex-direction: column-reverse;

        }

        &__picture {
            float: right;
            padding-top: 0.5rem;
            margin: 0 0 0 3rem;

            @media (max-width: 1170px) {
                max-width: 450px;
            }

            @media (max-width: 930px) {
                max-width: 250px;
                margin: auto;
                margin-bottom: 1rem;
                
            }
        }

        &__form {
            display: flex;
            flex-direction: column;
            align-items: center;
            max-width: 840px;
            width: 40%;
            border: 3px solid #ffd7d7;
            border-radius: 50px;
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            margin-left: -2rem;
            padding: 1rem;

            @media (max-width: 930px) {
                 
                min-width: 250px;
                margin-left: auto;
                margin-right: auto;
                
            }

            &__title {
                margin-bottom: 3rem;
                font-size: 27px;
            }

            &__input {
                display: flex;
                flex-direction: column;
                margin-bottom: 2rem;
                width: 70%;

                &__label {
                    text-align: start;
                    font-weight: bolder;
                }
            }

            &__button {
                border: 3px solid #4e5166;
                border-radius: 25px;
                color: #0b0a0a;
                font-size: 15px;
                font-weight: bold;
                padding: 0.9rem;
                margin: 1rem;
                outline-style: none;

                &:hover,
                &:focus {
                    border: 3px solid #fd2d01;
                    color: #fd2d01;
                    cursor: pointer;
                }
            }

            &__signup {
                font-weight: bold;
                text-decoration: none;
                color: #ffd7d7;

                
            &:hover {
            border: 1px solid;
            background-color: #ffd7d7;
            color: #fd2d01;
    }
                
            }

        }
    }
}
</style>