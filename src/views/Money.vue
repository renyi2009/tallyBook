<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"></NumberPad>
    <!--    <Types :value="record.type" @update:value="onUpdateType"></Types>-->
    <Types :value.sync="record.type"></Types>
    <div class="notes">
      <FormItem field-name="备注" placeholder="请输入备注" @update:value="onUpdateNotes"></FormItem>
    </div>
    <Tags></Tags>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component} from 'vue-property-decorator';
import store from '@/store/index.ts';


@Component({
  components: {Tags, FormItem, Types, NumberPad},
  computed: { // count 放在 computed 里面可以随时变更
    recordList() {
      return store.state.recordList;
    }
  }
})
export default class Money extends Vue {
  // eslint-disable-next-line no-undef
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 100
  };

  created() {
    store.commit('fetchRecords');
  }

  /*add() {
    this.$store.commit('increment', 1);
    // store.commit('increment', 1);
  }*/

  onUpdateNotes(value: string) {
    console.log(value);
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    console.log(value);
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    store.commit('createRecord', this.record);
  }
}
</script>

<style>
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>
