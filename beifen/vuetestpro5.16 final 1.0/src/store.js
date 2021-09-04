import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gateway:'',
    listengate:'',
    videoShare:null,
    userAccount:null,
    ipfsNode:null,
  },
  mutations: {
    setListenGate(state, visible){
      state.listengate = visible
    },

    setGateWay(state, visible){
      state.gateway = visible
    },
    setVideoShare(state, visible){
      state.videoShare = visible
    },
    setUserAccount(state, visible){
      state.userAccount = visible
    },
    setIpfsNode(state, visible){
      state.ipfsNode = visible
    },
  },
  actions: {

  }
})
