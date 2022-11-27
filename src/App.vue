<script setup>
import { RouterLink, RouterView } from "vue-router";
import { usePostStore } from '@/stores/post'

const store = usePostStore()

function newPost() {
  store.editNewPost()
  store.openCloseCreateEdit(true)
}

</script>

<template>
  <header>
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="#">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto sm:h-10" src="@/assets/logo.svg" alt="">
          </a>
        </div>
        <div class="-my-2 -mr-2">
          <button 
            @click="newPost"
            type="button" class="inline-flex items-center font-semibold  justify-center rounded-lg bg-emerald-500 p-2 text-white hover:bg-emerald-200 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
            <span class="sr-only">New Post</span>
            <!-- Heroicon name: outline/bars-3 -->
            &#43; New Post
          </button>
        </div>
      </div>
    </div>
  </header>
  <main class="font-sans">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  /* header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  } */

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
