<template>
	<div>
		<Navbar/>
		<div>
			<h1 v-if="user">Bonjour {{ user.username }} !</h1>

			<div class="profile">
				<h2>Changer votre profil:</h2>

				<div class="profile__photo">
					<avatarSrc :src="user.avatar" class="profile__photo__image"/>					

					<div class="profile__photo__modify">
						<button @click="uploadFile" type="button" class="profile__photo__modify__btnInvisible"><i class="fa-solid fa-user-pen"></i> Modifier son Avatar</button>
						
						<input type="file" ref="fileUpload" @change="onFileSelected"  accept="image/*" id="file-input" aria-label="Modifier son avatar">
					</div>
				</div>
								
				<div class="profile__info">
					<p class="profile__info__title">Pseudo</p>
					<div class="profile__info__text">{{ user.username }}</div>
					
					<p class="profile__info__title">Email</p>
					<div class="profile__info__text">{{ user.email }}</div>
				</div>

				<button @click="modifyProfile" class="profile__smallButton">Valider <i class="fa-solid fa-circle-check"></i></button>
				<button onclick="window.location.href = 'http://localhost:8080/#/post';" class="profile__smallButtonHome">Accueil <i class="fa-solid fa-house-user"></i></button>
		
			</div>

			<AccountDeletion v-bind:revele="revele" v-bind:displayModale='displayModale'/>
			<button class="profile__bigButton" v-on:click="displayModale">Supprimer mon compte ? <i class="fa-solid fa-trash-can-arrow-up"></i></button>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import { Notyf } from 'notyf'
	import 'notyf/notyf.min.css'
	import Navbar from '@/components/Navbar.vue'
	import AccountDeletion from '@/components/AccountDeletion.vue'
	import avatarSrc from '../components/avatarSrc.vue'
	export default {
		name: 'Profile_Bloc',
		components: {
			Navbar,
			AccountDeletion,
			avatarSrc
		},
		data(){
			return {
			revele: false,
			user: "",
			avatar: null,
			}
		},
		created() {
			this.displayProfile();  
			this.notyf = new Notyf({
			duration: 2000,
			position: {
				x: 'center',
				y: 'top'
			}
			}); 
		},
		methods: {
			//Afficher le profil utilisateur
			displayProfile() {
				const userId = localStorage.getItem('userId');
				axios.get('http://localhost:3000/api/user/' + userId, {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('token')
					}
				})
				.then(response => {
					this.user = response.data;
					localStorage.setItem('avatar', response.data.avatar);
				})
				.catch(error => {
					const msgerror = error.response.data
					this.notyf.error(msgerror.error)
				})
			},
			//Modifier la photo de profil 
			uploadFile () {
				this.$refs.fileUpload.click()
			},
			onFileSelected(event) {
				this.avatar = event.target.files[0]
			},
			modifyProfile() {
				const userId = localStorage.getItem('userId');
				const formData = new FormData();
				formData.append("image", this.avatar);
				axios.put('http://localhost:3000/api/user/' + userId, formData, {
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem('token'),
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(() => {
					this.notyf.success('Profil modifié !')
					this.displayProfile();
				})
				.catch(error => {
					const msgerror = error.response.data
					this.notyf.error(msgerror.error)
				})
			},
			//Afficher la boîte modale pour la suppression du compte
			displayModale() {
				this.revele = !this.revele
			}
		}
	}
</script>

<style scoped lang="scss">
	h1, h2 {
	margin-top: 2rem;
	}
	.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 40%;
		max-width: 60%;
		margin: 1rem auto;
		background-image: url(../assets/image_de_fond.jpg);
		border-radius: 25px;
		@media (max-width: 500px) {
			min-width: 60%;
		}
		&__photo {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 1rem;
			&__image {
			margin-right: 1rem;
			margin-bottom: 0.5rem;
			}
			&__modify>input {
			display: none; 
			}
			&__modify__btnInvisible {
			border: none;
			background-color: white;
			color: #3f3d56;
				&:hover, &:focus {
					color: white;
					background-color: #f33009;
					cursor: pointer;
				}
			}
		}
		&__info {
			display: flex;
			flex-direction: column;
			text-align: left;
			margin: 2rem;
			&__title {
			font-weight: bold;
			margin: 1rem 0 0.4rem 0;
			}
			&__text {
			background: rgb(221, 176, 165);
			border-radius: 10px;
			padding: 0.5rem;
			width: 15rem;
			}
		}
		&__smallButton {
			border: 2px solid #3f3d56;
			border-radius: 25px;
			color: #3f3d56;
			font-size: 20px;
			font-weight: bold;
			padding: 0.4rem;
			margin: 1rem;
			outline-style: none;
			background: white;
			&:hover, &:focus {
			color: #f33009;
			border: 2px solid #f33009;
			cursor: pointer;
			}
		}
		&__smallButtonHome {
			border: 2px solid #f3f3f6;
			color: #3f3d56;
			font-size: 10px;
			font-weight: bold;
			padding: 0.4rem;
			margin: 1rem;
			outline-style: none;
			background: rgb(240, 75, 4);
			&:hover, &:focus {
			background:#f3f3f6;
			color: #f33009;
			border: 2px solid #f33009;
			cursor: pointer;
			}
		}
		&__bigButton {
			border: 3px solid #3f3d56;
			border-radius: 25px;
			color: #3f3d56;
			font-size: 15px;
			font-weight: bold;
			padding: 0.9rem;
			margin: 0.5rem;
			outline-style: none;
			&:hover, &:focus {
			border: 3px solid #f33009;
			color: #f33009;
			cursor: pointer;
			}
		}
	}
</style>