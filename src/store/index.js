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
    login(_, form) {
      return firebase.auth.signInWithEmailAndPassword(
        form.username,
        form.password
      )
    },
    async fetchUserProfile({ commit }, user) {
      return firebase.usersCollection
        .doc(user.uid)
        .get()
        .then(userProfile => {
          commit('setUserProfile', userProfile.data())
          if (
            router.currentRoute.path === '/login' ||
            router.currentRoute.path === '/signup'
          ) {
            router.push('/dashboard')
          }
          return null
        })
    },
    async signup(_, form) {
      return firebase.auth
        .createUserWithEmailAndPassword(form.email, form.password)
        .then(result => {
          return firebase.usersCollection.doc(result.user.uid).set({
            fullname: form.fullname,
            // username: form.username,
            email: form.email,
          })
        })
    },
    async logout({ commit }) {
      await firebase.auth.signOut()
      commit('setUserProfile', {})
      router.push('/login')
    },
  },
  modules: {},
})
