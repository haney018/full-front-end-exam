<script setup>
import { usePostStore } from '@/stores/post'
import { ref } from '@vue/reactivity'

const store = usePostStore()

let searchText = ref("")

async function searchPost() {
  let val = searchText.value
  if (val.length > 1) {
    await store.searchPosts(searchText.value)
  } else {
    await store.getAllPosts()
  }
  const element = document.getElementById("listHeader");
  element.scrollIntoView();
  
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <div class="flex">
      <div class="flex-1 my-20 md:my-auto text-center md:text-left">
        <h2>
          <span class="text-grey-50">Let's Explore</span><br/>
          <span class="text-emerald-500 text-5xl">Post search</span>
        </h2>
        <p>Enter the post title in the search box</p>
        <div class="flex w-3/4 mx-auto md:mx-0">
          <input
            class="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            type="text"
            name="search" 
            id="search" 
            placeholder="POST TITLE"
            v-model="searchText"
          >
          <button class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
            @click="searchPost"
          >
            <span class="text-indigo-200" aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>
      <div class="flex-1 hidden md:flex">
        <img
          alt="Person reading while drinking coffee"
          class="mx-auto my-10 w-3/4"
          src="@/assets/onlinepost.png"
        />
      </div>
    </div>
  </div>
</template>
