import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		user: uni.getStorageSync('user'),
		carSum: uni.getStorageSync('carHistory')
	},
	mutations: {
		setUser(state, value) {
			state.user = value
		},
		setCarSum(state, value) {
			state.carSum = value
		}

	},
	actions: {}
})
export default store
