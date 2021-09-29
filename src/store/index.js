import { createStore } from 'vuex';

import indicatorsModule from './modules/indicators/index';

const store = createStore({
    modules: {
        indicators: indicatorsModule
    },
    stata() {
        return {
            user: ""
        }
    },
    mutations: {
        registerUser(state, payload) {
            state.user = payload.email
        }
    },
    actions: {
        registerUser(context, payload) {
            context.commit('registerUser', payload)
        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
})

export default store;