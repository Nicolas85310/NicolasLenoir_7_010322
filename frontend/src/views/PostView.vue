
<template>

    <div>
        <Navbar/>

        <div class="newPost">

            <div class="newPost__photo">
                <Avatar v-if="avatar == 'null'" :src="'./id-card-solid.svg'" class="newPost__photo"/>
                <Avatar v-else :src="avatar" class="newPost__photo"/>
            </div>

            <form @submit.prevent="createPost" aria-label="Nouveau message">
                <div class="newPost__content">
                    <textarea v-model="content" class="newPost__content__text" name="message" id="message" placeholder="Entrer votre texte ici...." aria-label="Poster un article"/>    
                    
                    <div id="preview" style="display:block">
                        <img v-if="imagePreview" :src="imagePreview" id="preview" style="display:block" class="newPost__content__image" alt="Aperçu de l'image"/>
                    </div>        
                </div>

                <div class="newPost__option">
                    <div class="newPost__option__file">
                    <button v-if="false"  @click="uploadFile" type="button" class="newPost__option__file__btnInvisible"><i class="fa-solid fa-photo-film fa-2x"></i>  Choisir une image </button> 
                    
                        <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" aria-label="Sélectionner un fichier">
                    </div>
                    
                    <button type="submit" class="newPost__option__button" aria-label="Publier le message">Envoyer <i class="fa-solid fa-share"></i></button>
                </div>
            </form>
        </div>
        
        <div class="displayPost" v-for="post in posts" :key="post.postId">
            <div class="displayPost__item">
                <div class="displayPost__item__information">
                    <div class="displayPost__item__information__user">
                        <Avatar :src="post.User.avatar" class="displayPost__item__information__user__photo"/>
                        <h2 class="displayPost__item__information__user__name">{{ post.User.username }}</h2>
                    </div>
                  
                    <div>
                        <span class="displayPost__item__information__date">Posté le {{ dateFormat(post.createdAt) }} à {{ Format(post.createdAt) }}</span>
                    </div>
                </div>

                <div class="displayPost__item__publication">
                    <p :contentPostId="post.id" style="display:block" class="displayPost__item__publication__text">{{ post.content }}</p>

                    <div :inputId="post.id" style="display:none" v-bind:showInputModify="showInputModify" class="displayPost__item__publication__text__modifyText">
                        <textarea v-model="contentmodifyPost" :placeholder = "post.content"  id="textarea" class="displayPost__item__publication__text__modifyText__textarea" aria-label="Modifier le message"/>
                        
                        <div class="displayPost__item__publication__text__modifyText__option">
                            <div class="displayPost__item__publication__text__modifyText__option__file">
                                <button v-if = 'false' @click="uploadFile" type="button" class="displayPost__item__publication__text__modifyText__option__file__btnInvisible"><i class="far fa-images fa-2x"></i> Choisir un fichier</button>
                               
                                <input type="file" ref="fileUpload" @change="onFileSelected" accept="image/*" aria-label="Sélectionner un fichier">
                            </div>

                            <button v-on:click="modifyPost(post.id)" class="displayPost__item__publication__text__modifyText__option__button" aria-label="Enregistrer les modifications">Enregistrer <i class="fas fa-check"></i></button>
                        </div>

                        <img v-if="post.imagePost && !imagePreview" :src="post.imagePost" class="displayPost__item__publication__image" alt="Image insérée dans le message"/>
                        
                        <img v-if="imagePreview" :src="imagePreview" class="newPost__content__image" alt="Prévisualisation de l'image ajoutée au message modifié"/>
                    </div>

                    <img v-if="post.imagePost" :imgPostId="post.id" style="display:block" :src="post.imagePost" class="displayPost__item__publication__image" alt="Image insérée dans le message"/>
                </div>

                <div class="displayPost__item__option">
                    <Likes v-bind:post="post"/>
                    
                    <div>
                        <i @click="displayComment(post.id)" v-on:click="diplayCreateComment(post.id)" class="displayPost__item__option__button fa-solid fa-message fa-2x" aria-label="Commenter le message"></i>
                        <span v-if="false&&post.Comments.length > 0" class="displayPost__item__option__count">{{ post.Comments.length }}</span>
                    </div>
                    
                    <i v-if="userId == post.userId || adminStatus == 'true'" @click="displayModifyPost(post.id)" class="displayPost__item__option__button fa-regular fa-pen-to-square fa-2x" aria-label="Modifier le message"></i>
                    
                    <i v-if="userId == post.userId || adminStatus == 'true'" v-on:click="deletePost(post.id)" class="displayPost__item__option__button fa-solid fa-trash-can-arrow-up fa-2x" aria-label="Supprimer le message"></i>
                </div>
            </div>
            
            <div>
                <div class="displayComment" v-for="comment in comments" :key="comment.commentId">
                    <div v-bind:showComment="showComment" v-if="showComment && post.id == comment.postId" class="displayComment__item">
                        <div class="displayComment__item__information">
                            <div class="displayComment__item__information__user">
                                <Avatar :src="comment.User.avatar" class="displayPost__item__information__user__photo"/>
                                
                                <h2 class="displayComment__item__information__user__name"> {{ comment.User.username }}</h2>
                            </div>

                            <div>
                                <span class="displayPost__item__information__date">Posté le {{ dateFormat(comment.createdAt) }} à {{ Format(comment.createdAt) }}</span>
                            </div>
                        </div>

                        <div class="displayPost__item__publication">
                            <p class="displayPost__item__publication__text">{{ comment.content }}</p>
                        </div>

                        <div class="displayPost__item__option">
                            <i v-if="userId == comment.userId || adminStatus == 'true'" @click="deleteComment(comment.id)" class="displayPost__item__option__button fa-solid fa-trash-can-arrow-up"></i>
                        </div>
                    </div>
                </div>

                <div :formId="post.id" style="display:none" v-bind:showCreateComment="showCreateComment" class="displayComment__newComment">
                    <form @submit.prevent="createComment(post.id)" class="displayComment__newComment__form">
                        <textarea v-model="contentComment" class="displayComment__newComment__form__text" name="comment" id="comment" placeholder="Ecrivez votre commentaire ..." aria-label="Rédiger un nouveau commentaire"/>              
                        
                        <div>
                            <button class="displayComment__newComment__form__button" aria-label="Poster le commentaire"><i class="fa-regular fa-comment fa-xl"></i></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <router-view/>
    </div>
</template>



<script>
    import axios from 'axios'
    import moment from 'moment'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'
    
    import Navbar from '@/components/Navbar.vue'
    import Avatar from '../components/avatarSrc.vue'
    import Likes from '../components/Likes.vue'
    
   

    export default {
        name: 'Post_bloc',
        components: {
            Navbar,
            Avatar,
            Likes
        },
        data() {
            return {
                userId: localStorage.getItem('userId'),
                username: localStorage.getItem('username'),
                adminStatus: localStorage.getItem('adminStatus'),
                avatar: localStorage.getItem('avatar'),
                posts: [],
                post: '',
                imagePost: '',
                imagePreview: null,
                content: '',
                contentmodifyPost: '',
                comments: [],
                contentComment: '',
                like: false,
                postLikes: [],
                revele: false,
                showComment: false,
                showCreateComment: false,
                showInputModify: false,
            }
        },
        created() {
            this.displayPost();
            this.notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'center',
                    y: 'top'
                }
            });
        },  
        methods: {
         

            
            //Nouveau message
            uploadFile() {
                this.$nextTick(() =>
                {this.$refs.fileUpload.click();
                console.log();
                });
            },
            
            onFileSelected(event) {
                this.imagePost = event.target.files[0];
                this.imagePreview = URL.createObjectURL(this.imagePost);
            },      
            createPost() {
                const formData = new FormData();
                formData.append("content", this.content);
                formData.append("image", this.imagePost);

                axios.post('http://localhost:3000/api/post', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()
                })
                .catch(error => {
                    
                    const msgerror = error.response.data;
                    this.notyf.error(msgerror.error)
                    
                })
            },
            

            //Récupération messages
            displayPost() {
                axios.get('http://localhost:3000/api/post', {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.posts = response.data;
    
                })
                .catch(error => {
                    
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                    
                })
            },

            //date 
            dateFormat(date){
                if (date) {
                    return moment(String(date)).format("DD/MM/YY")
                }
            },

            //heure
            //const timestamp = moment.unix(1634726212);
            Format(timestamp){
                if (timestamp) {
                    return moment(String(timestamp)).format("HH:mm")
                }
            },
            

            //champs pour la modification
            displayModifyPost(id) {
                const postId = id;

                this.showInputModify == false

                let input = document.querySelector('div[inputId="'+id+'"]')
                let inputId = input.getAttribute('inputId');

                let contentPost = document.querySelector('p[contentPostId="'+id+'"]')
                let contentPostId = contentPost.getAttribute('contentPostId');

                let imgPreviewCreatePost = document.querySelector('#preview')


                if(postId == inputId && postId == contentPostId && this.showInputModify == false) {
                    input.style.display = "block";
                    contentPost.style.display = "none";
                    imgPreviewCreatePost.style.display = "none";
                    this.showInputModify = !this.showInputModify

                    let imgPost = document.querySelector('img[imgPostId="'+id+'"]')
                    let imgPostId = imgPost.getAttribute('imgPostId');

                    if(postId == imgPostId) {
                        imgPost.style.display = "none";
                    }
                    
                } else if(postId == inputId && this.showInputModify == true) {
                    input.style.display = "none";
                    contentPost.style.display = "block";
                    let imgPost = document.querySelector('img[imgPostId="'+id+'"]')
                    imgPost.style.display = "block";
                    this.showInputModify = !this.showInputModify
                }
            },

            //Modifier le message
            modifyPost(id) {
                const postId = id;

                const formData = new FormData();
                formData.set("content", this.contentmodifyPost);
                formData.set("image", this.imagePost);

                axios.put('http://localhost:3000/api/post/' + postId, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(() => {
                    window.location.reload()
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },

            //Supprimer un message
            deletePost(id) {
                const postId = id;
               
                axios.delete('http://localhost:3000/api/post/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.displayPost();
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },
            
            

            //champs pour le commentaire
            diplayCreateComment(id) {
                const postId = id;

                this.showCreateComment == false

                let form = document.querySelector('div[formId="'+id+'"]')
                let formId = form.getAttribute('formId');
                
                if(postId == formId && this.showCreateComment == false) {
                    form.style.display = "block";
                    this.showCreateComment = !this.showCreateComment
                } else if(postId == formId && this.showCreateComment == true) {
                    form.style.display = "none";
                    this.showCreateComment = !this.showCreateComment
                }
            },

            //Création du commentaire
            createComment(id) {
                const postId = id;

                axios.post('http://localhost:3000/api/comment/' + postId, {
                    content: this.contentComment,
                },{
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()                    
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },

            //Afficher les commentaires d'un message
            displayComment(id) {
                this.showComment = !this.showComment

                const postId = id;
                
                axios.get('http://localhost:3000/api/comment/' + postId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.comments = response.data;
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            },

            //Supprimer un commentaire (si propriétaire)
            deleteComment(id) {
                const commentId = id;

                axios.delete('http://localhost:3000/api/comment/' + commentId, {
                    headers: {
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(() => {
                    window.location.reload()
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
    
    .newPost {
        background-image: url(../assets/image_de_fond.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 25px;
        margin: auto;
        margin-top: 5rem;
        padding: 1rem;
        width: 60%;
        

        @media (max-width: 950px) {
            width: 60%;
        }
        @media (max-width: 768px) {
            width: 80%;
        }
        @media (max-width: 550px) {
            width: 90%;
        }
        @media (max-width: 450px) {
            width: 90%;
        }
        &__photo__image {
            width: 47px;
        }
        &__content__text {
            border-radius: 0 10px;
            border: none;
            margin: 1.5rem 0 0 0;
            max-width: 50rem;
            width: 90%;
            min-height: 2rem;
        }
        &__content__image {
            max-width: 50rem;
            width: 90%;
            height: 250px;
            margin: 1rem auto;
            object-fit: cover;
        }
        &__option {
            display: flex;
            justify-content: space-around;
            align-items: center;
            &__file>input {
                @media (max-width: 515px) {
                font-size: 10px;}
                //display: none; 
            }
            &__file {
                &__btnInvisible {
                    display: flex;
                    align-items: center;
                    color: #3f3d56;
                    border: 2px solid #3f3d56;
                    background-color: #ffd7d7;
                    &:hover, &:focus {
                        color: #f33009;
                        border: 2px solid #f33009;
                    }
                }
            }
            &__button {
                border: 2px solid #3f3d56;
                border-radius: 25px;
                color: #3f3d56;
                font-size: 15px;
                font-weight: bold;
                padding: 0.4rem;
                margin: 1rem;
                outline-style: none;
                @media (max-width: 515px) {
                font-size: 10px;
          
            }    
                &:hover, &:focus {
                    border: 2px solid #f33009;
                    color: #f33009;
                }
            }
            
        }
    }
    .displayPost {
        display: flex;
        flex-direction: column;
        &__item {
            display: flex;
            flex-direction: column;
            border: 3px solid #f33009;
            border-radius: 25px;
            margin: auto;
            margin-top: 2rem;
            padding: 1rem;
            width: 60%;
            @media (max-width: 950px) {
                width: 60%;
            }
            @media (max-width: 768px) {
                width: 80%;
                padding: 0.5rem;
            }
            @media (max-width: 550px) {
                width: 90%;
            }
            @media (max-width: 450px) {
                width: 90%;
            }
            &__information {
                display: flex;
                justify-content: space-between;
                align-items: center;
                @media (max-width: 380px) {
                    display: flex;
                    flex-wrap: wrap;
                }
                &__user {
                    display: flex;
                    align-items: center;
                    &__photo {
                    margin: 0.5rem 0.5rem 0 0;
                    }
                    &__name {
                        margin-bottom: 0.2rem;
                        font-size: 22px;
                        @media (max-width: 767px) {
                            font-size: 18px;
                        }
                    }
                }
                &__date {
                    display: flex;
                    justify-content: flex-end;
                    font-style: oblique;
                    font-size: x-small;
                    color: #ffd7d7;
                    @media (max-width: 767px) {
                        font-size: 14px;
                    }
                    @media (max-width: 380px) {
                        font-size: 10px;
                    }
                }
            }
            &__publication {
                display: flex;
                flex-direction: column;
                margin: 0.5rem 2rem;
                @media (max-width: 700px) {
                    margin: 0.5rem;
                }
                &__text {
                    text-align: left;
                    margin: 0 ;
                    @media (max-width: 700px) {
                        font-size: 14px;
                    }
                    @media (min-width: 2800px) {
                        margin-left: 1.8rem;
                    }
                    &__modifyText {
                        display: flex;
                        align-items: center;
                        padding: 2rem 0;
                        margin: 1rem 0;
                        border-radius: 15px;
                        box-shadow: 5px 5px 15px grey;
                                          
                        &__textarea {
                            border-radius: 5px;
                            width: 90%;
                            
                        }
                        &__option {
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            &__file>input {
                            //display: none;
                            @media (max-width: 515px) {
                            font-size: 10px;} 
                            }
                            &__file__btnInvisible {
                                display: flex;
                                align-items: center;
                                font-size: 14px;
                                color: #3f3d56;
                                border: none;
                                background-color: ffd7d7;
                                &:hover, &:focus {
                                    color: #ffd7d7;
                                }
                            }
                            &__button {
                                border: 2px solid #3f3d56;
                                border-radius: 25px;
                                color: #3f3d56;
                                font-size: 14px;
                                font-weight: bold;
                                padding: 0.4rem;
                                margin: 1rem;
                                outline-style: none;
                                margin-left: 1rem;
                                @media (max-width: 515px) {
                                font-size: 10px; }    
                                &:hover, &:focus {
                                    border: 3px solid #f33009;
                                    color: #f33009;
                                }
                            }
                        }
                    }
                }
                &__image {
                    max-width: 1250px;
                    width: 100%;
                    height: 400px;
                    margin: 1rem auto;
                    object-fit: cover;
                }
            }
            &__option {
                display: flex;
                justify-content: space-around;
                &__button:hover, &__button:focus {
                    color: #f33009;
                    cursor: pointer;
                }
                &__count {
                    padding-left: 0.5rem;
                }
            }
        }
    }

    .displayComment {
        display: flex;
        flex-direction: column;
        &__item {
            display: flex;
            flex-direction: column;
            border: 2px solid #ffd7d7;
            border-radius: 25px;
            margin: auto;
            margin-top: 0.5rem;
            padding: 0.5rem;
            width: 50%;
            @media (max-width: 950px) {
                width: 60%;
            }
            @media (max-width: 768px) {
                width: 80%;
            }
            @media (max-width: 550px) {
                width: 70%;
            }
            @media (max-width: 450px) {
                width: 80%;
            }
            &__information {
                display: flex;
                justify-content: space-between;
                align-items: center;
                &__user {
                    display: flex;
                    align-items: center;
                    &__photo {
                    margin: 0 0.5rem 0 0;
                    }
                    &__name {
                        margin-top: 0.5rem;
                        margin-bottom: 0;
                        font-size: 18px;
                    }
                }
            }
        }
        &__newComment {
            background: #0d0d0d;
            border-radius: 25px;
            margin: auto;
            margin-top: 0.5rem;
            padding: 0.5rem;
            width: 50%;
            @media (max-width: 950px) {
                width: 50%;
            }
            @media (max-width: 768px) {
                width: 60%;
            }
            @media (max-width: 550px) {
                width: 70%;
            }
            @media (max-width: 450px) {
                width: 80%;
            }
            &__form {
                display: flex;
                align-items: center;
                justify-content: center;
                &__text {
                    border-radius: 15px;
                    border: none;
                    margin: 0.5rem ;
                    padding: 0.5rem;
                    max-width: 50rem;
                    width: 90%;
                    min-height: 3rem;
                }
                &__button {
                    border: 2px solid #3f3d56;
                    border-radius: 10px;
                    color: #f33009;
                    font-size: 15px;
                    width: 40px;
                    font-weight: bold;
                    padding: 0.4rem;
                    margin: 1rem;
                    outline-style: none;
                    &:hover, &:focus {
                        color: #f33009;
                        cursor: pointer;
                    }
                    @media (max-width: 450px) {
                        margin: 0.5rem;
                    }
                    
                }
            }
        }
    }
    @media (max-width: 767px) {
        textarea {
            font-size: 14px;
        }
        button {
            font-size: 14px;
        }
    }
</style>
