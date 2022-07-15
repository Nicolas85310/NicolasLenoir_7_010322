<template>
	<div class="newPost__photo">
		<img :src="src || 'logo300.png'" class="image" alt="Votre Avatar"/>
		
	</div>
</template>


<script>
	export default {
		name: 'avatarSrc',
		props: ['src']
	}
</script>


<style lang="scss">
	.image {
		object-fit: cover;
		width: 3rem;
		height: 3rem;
		border-radius: 100%;
	}
</style>