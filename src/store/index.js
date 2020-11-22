import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import * as firebase from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await firebase.auth.signInWithEmailAndPassword(
        form.username,
        form.password
      )
      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await firebase.usersCollection.doc(user.uid).get()

      commit('setUserProfile', userProfile.data())

      if (
        router.currentRoute.path === '/login' ||
        router.currentRoute.path === '/signup'
      ) {
        router.push('/dashboard')
      }
    },
    async signup({ dispatch }, form) {
      const { user } = await firebase.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      )
      await firebase.usersCollection.doc(user.uid).set({
        fullname: form.fullname,
        username: form.username,
        email: form.email,
      })
      dispatch('fetchUserProfile', user)
    },
    async logout({ commit }) {
      await firebase.auth.signOut()
      commit('setUserProfile', {})
      router.push('/login')
    },
  },
  modules: {},
})
