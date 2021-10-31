<template>
  <div id="app">
    <nav id="nav">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <img class="h-8" src="transparentlogo.png" />
      </div>
      <div class="block lg:hidden">
        <button
          @click="mobil = !mobil"
          class="
            flex
            items-center
            px-3
            py-2
            border
            rounded
            text-teal-200
            border-teal-400
            hover:text-gray-600 hover:border-gray-400
          "
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <!-- Desktop Menu -->
      <div class="w-full hidden flex-end md:flex md:items-center md:w-auto">
        <div class="text-md lg:flex-grow">
          <router-link class="link" to="/">Doktorlarımız</router-link>
          <router-link class="link" to="/about">Uygulama Hakkında</router-link>
          <a class="link" target="_blank" href="https://orthodigi.com"
            >Orthodigi Anasayfa</a
          >
        </div>
      </div>
      <!-- Mobil Menu -->
      <div
        v-show="mobil"
        class="w-full flex-end lg:flex lg:items-center lg:w-auto"
      >
        <div class="text-md lg:flex-grow">
          <router-link class="link" to="/">Doktorlarımız</router-link>
          <router-link class="link" to="/about">Uygulama Hakkında</router-link>
          <a class="link" target="_blank" href="https://orthodigi.com"
            >Orthodigi Anasayfa</a
          >
        </div>
      </div>
    </nav>
    <router-view />
    <footer class="py-8 text-sm w-10/12 m-auto">
      <p>
        <a target="_blank" href="https://akgngr.com">Abdulkadir GÜNGÖR</a>
        tarafından yapılmıştır
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobil: false,
    };
  },
  watch: {
    $route() {
      this.mobil = false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

nav {
  background-image: linear-gradient(
    to right,
    #5192e1 0%,
    #23ced5 51%,
    #5192e1 100%
  ) !important;
  @apply flex items-center justify-between flex-wrap p-6 text-white;
}

.link {
  @apply block mt-4 lg:inline-block lg:mt-0 mr-4;
}
</style>
