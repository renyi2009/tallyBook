<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"></NumberPad>
    <!--    <Types :value="record.type" @update:value="onUpdateType"></Types>-->
    <Types :value.sync="record.type"></Types>
    <Nodes @update:value="onUpdateNotes"></Nodes>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
    {{ recordList }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Nodes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';

const version = window.localStorage.getItem('versiono') || '0';
const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');

if (version === '0.0.1') {
  // 数据库升级，数据迁移
  recordList.forEach(record => {
    record.createdAt = new Date(2020, 0, 1);
  });
  // 保存数据
  window.localStorage.setItem('recordList', JSON.stringify(this.recordList));

}

window.localStorage.setItem('version', '0.0.2');

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number,
  createdAt: Date
}

@Component({
  components: {Tags, Nodes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];

  recordList: Record[] = recordList;

  record: Record = {
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
    const record2: Record = JSON.parse(JSON.stringify(this.record));
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }
}
</script>

<style>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
