<script setup>
import { ref } from '@vue/reactivity'
import { usePostStore } from '@/stores/post'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { computed } from '@vue/runtime-core'

const store = usePostStore()
const deleteMode = ref(false)

const status = computed({ 
    get: () => store.activePost.published ? 'Published' : 'Draft',
    set: (v) => { store.activePost.published = v === 'Published' }
})

async function checkForm() {
    if (store.activePost.id) {
      await store.updatePost(store.activePost)
    } else {
      await store.createPost(store.activePost)
    }
    store.$patch({activePost: null})
    await store.getAllPosts()
    store.openCloseCreateEdit(false)
}

async function deletePost() {
    if (store.activePost.id) {
      await store.deletePost(store.activePost)
      store.$patch({activePost: null})
      await store.getAllPosts()
      store.openCloseCreateEdit(false)
      deleteMode.value = false
    } 
}


function closeDialog() {
  store.$patch({activePost: null})
  store.openCloseCreateEdit(false)
}
</script>

<template class="font-sans">
  <TransitionRoot as="template" :show="store.createEdit">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div v-if="store.activePost" class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <form @submit.prevent="checkForm">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label for="first-name" class="block text-sm font-sans font-medium text-gray-700">Post Title</label>
                  <input 
                    type="text" 
                    name="first-name" 
                    id="first-name"
                    v-model="store.activePost.title"
                    min="1"
                    required
                    placeholder="Title"
                    class="font-sans font-medium mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                </div>

                <div class="col-span-6">
                  <label for="last-name" class="block text-sm font-sans font-medium text-gray-700">Post Body</label>
                  <textarea
                    v-model="store.activePost.body"
                    class="font-sans font-medium mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    id="about" 
                    name="about" 
                    rows="3" 
                    min="1"
                    required
                    placeholder="Type here" />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label for="country" class="block text-sm font-sans font-medium text-gray-700">Status</label>
                  <select 
                    id="country" 
                    name="country" 
                    v-model="status"
                    class="font-sans font-medium mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                </div>
              </div>
            </div>
            <div 
              v-if="!deleteMode"
              class="flex justify-between bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button 
                class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click="closeDialog"
              >Cancel</button>
              <button
                :style="{ opacity: store.activePost.id ? 1 : 0, pointerEvents: store.activePost.id ? 'initial' : 'none'}"
                class="inline-flex justify-center rounded-md border border-red-700 bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                @click.prevent="deleteMode = true"
              >Delete</button>
              <button 
                type="submit" 
                class="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >Save</button>
            </div>
          </div>
        </form>
              <div 
                v-if="deleteMode && store.activePost.id"
                class="bg-gray-50 px-4 py-3 flex justify-between"
              >
                <p class="font-sans font-medium my-2 text-red-600">Delete this post?</p>
                <div>
                  <button type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="deletePost">Yes</button>
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click.prevent="deleteMode = false">No</button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>