<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount"></NumberPad>
    <!--    <Types :value="record.type" @update:value="onUpdateType"></Types>-->
    <Types :value.sync="record.type"></Types>
    <Nodes @update:value="onUpdateNotes"></Nodes>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
    {{ record }}
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Nodes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';

type Record = {
  tags: string[]
  notes: string
  type: string
  amount: number
}

@Component({
  components: {Tags, Nodes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行'];

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
}
</script>

<style>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
