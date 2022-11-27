<script setup>
import { usePostStore } from '@/stores/post'
const props = defineProps(["postData"]);

const store = usePostStore()

function editPost() {
  store.selectPost(props.postData)
  store.openCloseCreateEdit(true)
}
</script>

<template>
  <div class="overflow-hidden bg-white shadow sm:rounded-lg my-5">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        <slot name="title"></slot>
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Last update: {{ new Date(postData.updated_at).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
      </p>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Content</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <slot name="body"></slot>
          </dd>
        </div>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Status</dt>
          <dd 
            :class="postData.published ? 'text-emerald-500' : 'text-red-500'"
            class="mt-1 text-sm text-gray-900 font-medium sm:col-span-2 sm:mt-0"
          >
            {{ postData.published ? 'Published' : 'Draft'}}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">Actions</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <button @click="editPost">Edit</button>
          </dd>
        </div>
      </dl>
    </div>
  </div>
 
</template>

<style scoped>

</style>
