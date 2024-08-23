import Vue from 'vue';
import Vuex from 'vuex';
import commentsModule from "./commentsModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        commentsModule
    }
})
