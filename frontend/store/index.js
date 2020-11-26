import axios from 'axios'

export const state = () => ({
  posts: [],
  filteredPosts: [],
  pagePosts: [],
  popularPost: [],
  postTags: [],
})


export const getters = {


  getPagePosts(state){
    return state.pagePosts;
  },

  getFilteredPosts(state) {
    return state.filteredPosts;
  },


  // Data fetching
  getPosts(state) {
    return state.posts;
  },

  getPopularPost(state){
    return state.popularPost;
  },

  getPostTags(state){
    return state.postTags;
  },



}

export const mutations = {

  mutatePagePosts(state, data) {
    state.pagePosts = data;
  },

  mutateFilteredPosts(state, data) {
    state.filteredPosts = data;
  },


  // Data fetching
  mutatePosts(state, data) {
    state.posts = data.reverse();
  },

  mutatePopularPost(state, data) {
    state.popularPost = data;
  },

  mutatePostTags(state, data) {
    state.postTags = data;
  },

  
}

export const actions = {

  changePagePosts({commit}, data){
    commit("mutatePagePosts", data);
  },

  changeFilteredPosts({commit}, data){
    commit("mutateFilteredPosts", data);
  },



  // Data fetching
  async fetchPosts({commit}) {
    return new Promise((resolve) => {
      axios.get("http://127.0.0.1:8000/api/posts/")
      .then((response) => {
        commit("mutatePosts", response.data);
        resolve(response);
      });

    });
  },


  async fetchPopularPost({commit}) {
    return new Promise((resolve) => {
      axios.get("http://127.0.0.1:8000/api/comments/")
      .then((response) => {
        commit("mutatePopularPost", response.data);
        resolve(response);
      });

    });
  },

  async fetchPostTags({commit}) {
    return new Promise((resolve) => {
      axios.get("http://127.0.0.1:8000/api/tags/")
      .then((response) => {
        commit("mutatePostTags", response.data);
        resolve(response);
      });


    });
  },





}


