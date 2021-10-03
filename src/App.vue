<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Doktorlarımız</router-link> |
      <router-link to="/about">Uygulama Hakkında</router-link> |
      <a target="_blank" href="https://orthodigi.com">Orthodigi Anasayfa</a>
    </div>
    <hr />
    <router-view />
    <footer class="py-8 text-sm w-10/12 m-auto">
      <p><a target="_blank" href="https://akgngr.com">Abdulkadir GÜNGÖR</a> tarafından yapılmıştır</p>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

#nav {
  @apply py-4 text-center
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
