import axios from 'axios'

export const state = () => ({
  posts: [],
  postsLoaded: false,

  filteredPosts: [],

  pagePosts: [],
  pagePostsLoaded: false,

  popularPosts: [],
  popularPostsLoaded: false,

  postTags: [],
  postTagsLoaded: false,
})


export const getters = {


  getPagePosts(state){
    return state.pagePosts;
  },

  getPagePostsLoaded(state) {
    return state.pagePostsLoaded;
  },

  getFilteredPosts(state) {
    return state.filteredPosts;
  },


  // Data fetching
  getPosts(state) {
    return state.posts;
  },

  getPostsLoaded(state) {
    return state.postsLoaded;
  },

  getPopularPosts(state){
    return state.popularPosts;
  },

  getPopularPostsLoaded(state){
    return state.popularPostsLoaded;
  },

  getPostTags(state){
    return state.postTags;
  },

  getPostTagsLoaded(state) {
    return state.postTagsLoaded;
  },


}

export const mutations = {

  mutatePagePosts(state, data) {
    state.pagePosts = data;
  },

  mutatePagePostsLoaded(state, data) {
    state.pagePostsLoaded = data;
  },

  mutateFilteredPosts(state, data) {
    state.filteredPosts = data;
  },


  // Data fetching
  mutatePosts(state, data) {
    state.posts = data.reverse();
  },

  mutatePostsLoaded(state, data) {
    state.postsLoaded = data;
  },

  mutatePopularPosts(state, data) {
    state.popularPosts = data;
    state.popularPostsLoaded = true;
  },

  mutatePostTags(state, data) {
    state.postTags = data;
  },

  mutatePostTagsLoaded(state, data) {
    state.postTagsLoaded = data;
  },
  
}

export const actions = {

  changePagePosts({commit}, data){
    commit("mutatePagePosts", data);
    commit("mutatePagePostsLoaded", true);
  },

  changeFilteredPosts({commit}, data){
    commit("mutateFilteredPosts", data);
  },



  // Data fetching
  async fetchPosts({commit}) {
    return new Promise((resolve) => {
      axios.get(process.env.BASE_URL + 'posts/')
      .then((response) => {
        commit("mutatePosts", response.data);
        commit("mutatePostsLoaded", true);
        resolve(response);
      });

    });
  },

  async fetchPopularPosts({commit}) {
    return new Promise((resolve) => {
      axios.get(process.env.BASE_URL + 'comments/')
      .then((response) => {
        commit("mutatePopularPosts", response.data);
        resolve(response);
      });

    });
  },

  async fetchPostTags({commit}) {
    return new Promise((resolve) => {
      axios.get(process.env.BASE_URL + "tags/")
      .then((response) => {
        commit("mutatePostTags", response.data);
        commit("mutatePostTagsLoaded", true);
        resolve(response);
      });


    });
  },





}


