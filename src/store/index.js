import Vue from 'vue';
import Vuex from 'vuex';//安装vuex的命令：npm install vuex --save
Vue.use(Vuex);//在一个模块化的打包系统中，您必须显式地通过 Vue.use(Vuex) 来安装 Vuex：

const state={//要设置的全局访问的state对象
  loginFresh: false	//是否需要刷新登录信息
};


const getters = {   //实时监听state值的变化(最新状态)
  getLoginFresh(state) {  //方法名随意,主要是来获取变化的showFooter的值
    return state.loginFresh
  }
};

const mutations = {
  needLoginFresh(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.loginFresh = true;
  },
  unneedLoginFresh(state) {  //同上
    state.loginFresh = false;
  },
  setLoginFresh(state, login){
    state.loginFresh = login;
  }
};

const actions = {
  needLoginFresh(context) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    context.commit('needLoginFresh');
  },
  unneedLoginFresh(context) {  //同上注释
    context.commit('unneedLoginFresh');
  },
  setLoginFresh(state, loginFresh){
    context.commit('setLoginFresh',loginFresh);
  }
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
