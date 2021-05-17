import Vue from 'vue';
import store from '@/store';
import {Component} from 'vue-property-decorator';

const map: {[key: string]: string} = {
  'tag name duplicated': '标签名重复了'
}

@Component
export default class TagHelper extends Vue { // 新增标签名
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) {
      window.alert('标签名不能为空');
      return;
    }
    store.commit('createTag', name);
    if (store.state.createTagError) {
      if(store.state.createTagError.message) {
        alert(map[store.state.createTagError.message] || '未知错误')
      }
    }
  }
}