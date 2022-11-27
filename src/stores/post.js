import { ref, computed } from "vue";
import axios from 'axios';
import { defineStore } from "pinia";

const apiUrl = "http://127.0.0.1:8000"

export const usePostStore = defineStore("post", {
  state: () => {
    return {
      createEdit: false,
      deleteMode: false,
      listLabel: "Latest Post",
      activePost: null,
      postList: []
    }
  },
  actions: {
    async getAllPosts() {
      await axios.get(apiUrl + '/api/posts/list')
        .then(response => {
          this.$patch({postList: response.data})
          this.$patch({listLabel: "Latest post:"})
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async searchPosts(searchKey) {
      await axios.get(apiUrl + '/api/posts/search/' + searchKey)
        .then(response => {
          this.$patch({postList: response.data})
          this.$patch({listLabel: `Search post: ${response.data.length} result found`})
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async createPost(data) {
      await axios.post(apiUrl + '/api/posts/create', data)
        .then(response => {
          console.log("Post created");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async deletePost(data) {
      await axios.post(apiUrl + '/api/posts/delete', data)
        .then(response => {
          console.log("Post deleted");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async updatePost(data) {
      await axios.post(apiUrl + '/api/posts/update', data)
        .then(response => {
          console.log("Post updated");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectPost(postData) {
      this.$patch({activePost: postData})
    },
    editNewPost() {
      this.$patch({activePost: { title: "", body: "", published: false }})
    },
    openCloseCreateEdit(val) {
      this.$patch({createEdit: val})
    },
  }
});
