import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex); // 把store 绑到  Vue.prototype.$store = store 上

const store = new Vuex.Store({
  state: { // data
    recordList: [] as RecordItem[],
  },
  mutations: { // methods
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date();
      state.recordList && state.recordList.push(record2); // state.recordList 存在才push
      store.commit('saveRecords');
      console.log('--=--', state.recordList);

    }
  },
  actions: {},
  modules: {}
});


export default store;
