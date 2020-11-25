import axios from 'axios'

export const state = () => ({
  posts: [],
  filteredPosts: [],
  pagePosts: [],
  pageComments: [],
  comments: [],
  popularPost: [],
  postTags: [],
})


export const getters = {


  getPagePosts(state){
    return state.pagePosts;
  },

  getPageComments(state){
    return state.pageComments;
  },




  // Data fetching
  getPosts(state) {
    return state.posts;
  },

  getFilteredPosts(state) {
    return state.filteredPosts;
  },

  getComments(state) {
    return state.comments;
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

  mutatePageComments(state, data) {
    state.pageComments = data;
  },





  // Data fetching
  mutateFetchPosts(state, data) {
    state.posts = data;
  },

  mutateFilteredPosts(state, data) {
    state.filteredPosts = data;
  },

  mutateComments(state, data) {
    state.comments = data;
  },

  mutatePopularPost(state, data) {
    state.popularPost = data;
  },

  mutatePostTags(state, data) {
    state.postTags = data;
  },

  mutateCreateComment(state, data) {
    state.comments.push(data);
  },
  
}

export const actions = {

  changePagePosts({commit}, data){
    commit("mutatePagePosts", data);
  },

  changePageComments({commit}, data){
    commit("mutatePageComments", data);
  },

  changeFilteredPosts({commit}, data){
    commit("mutateFilteredPosts", data);
  },



  
  // Data fetching
  async fetchPosts({commit}) {
    return new Promise((resolve) => {
      axios.get("http://127.0.0.1:8000/api/posts/")
      .then((response) => {
        commit("mutateFetchPosts", response.data);
        resolve(response);
      });

    });
  },

  async fetchComments({commit}, id) {
    return new Promise((resolve) => {
      axios.get("http://127.0.0.1:8000/api/comments/" + id)
      .then((response) => {
        commit("mutateComments", response.data);
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

  
  async createComment({commit}, newComment) {
    return new Promise((resolve, reject) => {
      axios.post("http://127.0.0.1:8000/api/comment/create", newComment)
      .then((response) => {
        commit("mutateCreateComment", response.data);
        resolve(response);
      })
      .catch((reject) => {
        resolve(reject);
      });

    });
  },




}


