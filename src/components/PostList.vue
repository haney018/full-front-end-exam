<script setup>
import { onMounted } from 'vue'
import { usePostStore } from '@/stores/post'
import PostItem from "./PostItem.vue";

const store = usePostStore()

onMounted(() => {
  try {
    store.getAllPosts()
  } catch (error) {
    console.log("Error fetching data. Please contact your administrator.")
  }
})

</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <h2 id="listHeader" class="font-sans">{{ store.listLabel }}</h2>
    <div class="">
      <PostItem
        v-for="(post, index) in store.postList"
        :key="index"
        :postData="post"
      >
        <template #title>
          {{ post.title }}
        </template>
        <template #body>
          {{ post.body }}
        </template>
      </PostItem>
    </div>
  </div>
</template>
