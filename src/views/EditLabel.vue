<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"></Icon>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <FormItem field-name="标签名"
                @update:value="updateTag"
                :value="currentTag.name"
                placeholder="请输入新的标签名"></FormItem>
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';
import store from '@/store';

@Component({
  components: {FormItem, Button},
})
export default class EditLabel extends Vue {
  get currentTag() {
    return store.state.currentTag;
  }

  created() {
    store.commit('fetchTags');
    const id = this.$route.params.id;
    store.commit('setCurrentTag', id);
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }

  remove() {
    if (this.currentTag) {
      store.commit('removeTag', this.currentTag.id);
    }
  }

  updateTag(name: string) {
    if (this.currentTag) {
      store.commit('updateTag', {id: this.currentTag.id, name});
    }
  }

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {

  }

  > .leftIcon {
    width: 24px;
    height: 24px;
    left: 16px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
    right: 16px;
  }
}

.form-wrapper {
  background: #fff;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>