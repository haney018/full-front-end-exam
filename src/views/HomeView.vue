<script setup>
import axios from 'axios';
import { onMounted } from 'vue'
import { usePostStore } from '@/stores/post'
import SearchJumbotron from "../components/SearchJumbotron.vue";
import PostList from "../components/PostList.vue";
import CreateEditPost from "../components/CreateEditPost.vue";
let store = usePostStore()
// console.log(store)

onMounted(() => {
  try {
    store.getAllPosts()
  } catch (error) {
    console.log("Error fetching data. Please contact your administrator.")
  }
})
</script>

<template>
  <SearchJumbotron />
  <PostList />
  <CreateEditPost />
</template>
