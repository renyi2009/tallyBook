import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';
import tageListModel from '@/models/tagListModel';
import recordListModel from '@/models/recordListModel';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);


// record
window.recordList = recordListModel.fetch()
window.createRecord = (record: RecordItem) => {
  recordListModel.create(record)
}

// tag
window.tagList = tagListModel.fetch();
window.findTag = (id: string) => {
  return window.tagList.filter(t => t.id === id)[0];
}
window.createTag = (name: string) => {
  const message = tageListModel.create(name);
  if (message === 'duplicated') {
    alert('已经有这个标签名了');
  } else if (message === 'success') {
    alert('添加成功');
  }
};

window.removeTag = (id: string) => {
  /*if (tagListModel.remove(id)) {
    return true;
  } else {
    return false;
  }*/
  return tageListModel.remove(id);
};

window.updateTag = (id: string, name: string) => {
  return tageListModel.update(id, name);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
