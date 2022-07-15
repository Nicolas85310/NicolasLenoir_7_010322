<template>
<div id="post">
  
  <nav>
    <!--<router-link to="/">Accueil(Connexion)</router-link> |
    <router-link to="/post">Accueil(création de post)</router-link> |
    <router-link to="/Profile">Profile</router-link> |-->
    
  </nav>

  
 
  <router-view/>
  </div>
</template>

<script>
    

    export default {
       
            //re-dirger vers le haut de page
           refresh() {
              
               window.location.href="#post"
            }
        }
    
    
</script>


<style lang="scss">
body { background: url(./assets/fond.jpg) no-repeat center fixed; 
-webkit-background-size: cover; /* pour Chrome et Safari */
-moz-background-size: cover; /* pour Firefox */
-o-background-size: cover; /* pour Opera */
background-size: cover; /* version standard ?*/
margin:0;
padding:0;
height:100%;

@media (max-width: 930px) {
height: 900px;           
       }
@media (max-width: 1669px) {
height: 1200px ;
            }      
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f7d7d7;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #f7d7d7;

    &.router-link-exact-active {
      color: #fd2d01;
    }
  }
}
.createAnewArticle{
    position: fixed;
    right: 5%;
    top: 25%;
    color: #3f3d56;
    border: 4px solid #3f3d56;
    background-color: #ffd7d7;
    border-radius: 25px;
    width: 10%;

    @media (max-width: 1200px) {
            width: 10%;}
    @media (max-width: 1130px) {
            width: 10%;          
            }
    @media (max-width: 768px) {
    font-size: 8px;
    right: 70%;
    top: 11%;
    width: 20%;          
            }        
         
    @media (max-width: 600px) {
     top: 10%;  
     width: 25%;     
            }
    @media (max-width: 500px) {
     top: 10%;  
     width: 30%;     
            }                  
    &:hover, &:focus {
    color: #f33009;
    border: 2px solid #f33009;
    }
    
    }

</style>
