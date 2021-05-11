<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"></NumberPad>
    <!--    <Types :value="record.type" @update:value="onUpdateType"></Types>-->
    <Types :value.sync="record.type"></Types>
    <div class="notes">
      <FormItem field-name="备注" placeholder="请输入备注" @update:value="onUpdateNotes"></FormItem>
    </div>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
    {{record}}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

console.log('---', recordListModel);

// const version = window.localStorage.getItem('version') || '0';
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();


@Component({
  components: {Tags, FormItem, Types, NumberPad}
})
export default class Money extends Vue {
  // tags = ['衣', '食', '住', '行'];
  tags = tagList;
  recordList = recordList;
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 100
  };

  onUpdateTags(value: string[]) {
    console.log(value);
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    console.log(value);
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    console.log(value);
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    // eslint-disable-next-line no-undef
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes{
  padding: 12px 0;
}
</style>
