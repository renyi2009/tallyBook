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
                :value="tag.name"
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
import tagListModel from '@/models/tagListModel';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {FormItem, Button}
})
export default class EditLabel extends Vue {
  tag: { id: string, name: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      this.tag = tag;
      console.log(tag);
    } else {
      this.$router.replace('/404');
    }
  }

  remove(id: string) {
    tagListModel.remove(this.tag.id);
  }

  updateTag(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
    console.log('--ss--', name);
  }

  goBack() {
    console.log('back')
    this.$router.back()
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